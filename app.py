from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Import the CORS module
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained machine learning model
with open("pcos_logistic.pkl", "rb") as f:
    model1 = pickle.load(f)

# Load the DataFrame containing the PCOS data
pc = pd.read_csv("Final_PCOS_dataset.csv")

# Function to get unique values for dropdown options
def get_unique_values():
    Blood_Group = pc["Blood Group"].unique().tolist()
    cycle = pc["Cycle(R/I)"].unique().tolist()
    pregnant = pc["Pregnant(Y/N)"].unique().tolist()
    weight_gain = pc["Weight gain(Y/N)"].unique().tolist()
    hair_growth = pc["hair growth(Y/N)"].unique().tolist()
    skin = pc["Skin darkening (Y/N)"].unique().tolist()
    hair_loss = pc["Hair loss(Y/N)"].unique().tolist()
    pimples = pc["Pimples(Y/N)"].unique().tolist()
    food = pc["Fast food (Y/N)"].unique().tolist()
    Reg_Exercise = pc["Reg.Exercise(Y/N)"].unique().tolist()

    return {
        "Blood_Group": Blood_Group,
        "cycle": cycle,
        "pregnant": pregnant,
        "weight_gain": weight_gain,
        "hair_growth": hair_growth,
        "skin": skin,
        "hair_loss": hair_loss,
        "pimples": pimples,
        "food": food,
        "Reg_Exercise": Reg_Exercise,
    }

# Route to render the form


# Route to get dropdown options
@app.route("/flask/get_dropdown_options", methods=["GET"])
def get_dropdown_options():
    options = get_unique_values()
    return jsonify(options)

# Route to predict PCOS based on the form data
@app.route("/flask/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Convert the input data into a DataFrame
    input_data = pd.DataFrame(data, index=[0])

    # Use the model to make predictions
    predicted_pcos = model1.predict(input_data)

    return jsonify({"pcos": round(predicted_pcos[0])})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
