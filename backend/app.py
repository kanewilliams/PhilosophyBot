from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def generate_philosophical_prompt(ism, position):
    prompt = f"""Generate a philosophical argument from the perspective of {ism} 
    regarding the position {position}. Consider the core principles and assumptions 
    of {ism} and how they would inform this position."""
    return prompt

@app.route('/api/generate-prompt', methods=['POST'])
def generate_prompt():
    data = request.json
    ism = data.get('ism')
    position = data.get('position')
    
    if not ism or not position:
        return jsonify({'error': 'Missing required fields'}), 400
    
    prompt = generate_philosophical_prompt(ism, position)
    return jsonify({'prompt': prompt})

if __name__ == '__main__':
    app.run(debug=True)