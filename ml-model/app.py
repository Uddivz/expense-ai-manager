from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
CORS(app)

# Dummy neural net predictor (simulate)
def fake_neural_net_predict(data):
    return np.mean(data) + 100  # just a placeholder

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    monthly_expenses = data.get("monthly_expenses", [])
    
    if not monthly_expenses:
        return jsonify({"error": "No data provided"}), 400

    X = np.arange(len(monthly_expenses)).reshape(-1, 1)
    y = np.array(monthly_expenses)
    model = LinearRegression()
    model.fit(X, y)
    next_month = np.array([[len(monthly_expenses)]])
    linear_pred = model.predict(next_month)[0]

    neural_pred = fake_neural_net_predict(monthly_expenses)

    return jsonify({
        "linear_regression_prediction": round(float(linear_pred), 2),
        "neural_net_prediction": round(float(neural_pred), 2)
    })

@app.route('/api/predict-month', methods=['POST'])
def predict_for_month():
    data = request.get_json()
    month = data.get("month")
    monthly_expenses = data.get("monthly_expenses", [])

    if not month or not monthly_expenses:
        return jsonify({"error": "Invalid input"}), 400

    # Fake predictions for that month
    linear_pred = np.mean(monthly_expenses)
    neural_pred = fake_neural_net_predict(monthly_expenses)

    return jsonify({
        "linear_regression_prediction": round(float(linear_pred), 2),
        "neural_net_prediction": round(float(neural_pred), 2),
        "predicted_month": month
    })

if __name__ == '__main__':
    app.run(port=6000, debug=True)
