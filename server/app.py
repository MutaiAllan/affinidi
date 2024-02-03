from flask import Flask, session, redirect, request, jsonify
from flask_session import Session
from authlib.integrations.flask_client import OAuth
from authlib.integrations.requests_client import OAuth2Session
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'my-secret'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

oauth = OAuth(app)

# Assuming AFFINIDI_ISSUER, AFFINIDI_CLIENT_ID, and AFFINIDI_CLIENT_SECRET are defined in the environment

# Discover Affinidi Login - Issuer
oidc_issuer = oauth.register(
    name='affinidi',
    server_metadata_url='ISSUER'
)

# Integrate Authentication
# Create an RP-client which can initiate an OIDC flow
client = oidc_issuer.create_client(
    client_id=os.getenv('CLIENT_ID'),
    client_secret=os.getenv('CLIENT_SECRET'),
    redirect_uri='http://localhost:5000/login/callback',
)

@app.route("/")
def home():
    return "Let's build a Unified Digital Identity <br/><br/><a href='/login'>Affinidi Login</a>"

@app.route('/login')
def login():
    return oidc_issuer.authorize_redirect(redirect_uri='http://localhost:5000/login/callback', scope='openid')

@app.route('/login/callback')
def callback():
    token = oidc_issuer.authorize_access_token()
    userinfo = oidc_issuer.parse_id_token(token)
    session['userinfo'] = userinfo
    return redirect('/protected')

@app.route("/protected")
def protected():
    return jsonify(session.get('userinfo', {}))

if __name__ == "__main__":
    app.run(debug=True)
