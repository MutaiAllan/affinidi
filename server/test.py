from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from affinidi_passport import affinidiProvider

load_dotenv()

app = Flask(__name__)

PORT = int(os.getenv('PORT', 3001))

@app.route('/')
def index():
    return jsonify({'success': 'Flask'})

@app.route('/auth/callback', methods=['GET', 'POST'])
def auth_callback():
    # Handle callback logic here
    return jsonify({'success': 'Authentication callback received'})

@app.route('/affinidi', methods=['GET', 'POST'])
def affinidi():
    if request.method == 'POST':
        credential = request.json
        print('Received credential:', credential)
        # Handle credential logic here
        return jsonify({'success': 'Credential received'})
    else:
        return jsonify({'error': 'Method not allowed'}), 405

if __name__ == "__main__":
    affinidi_provider = affinidiProvider(
        app,
        id="affinidi",
        issuer=os.getenv('AFFINIDI_ISSUER'),
        client_id=os.getenv('AFFINIDI_CLIENT_ID'),
        client_secret=os.getenv('AFFINIDI_CLIENT_SECRET'),
        redirect_uris=['http://localhost:3000/auth/callback']
    )
    app.run(port=PORT)
