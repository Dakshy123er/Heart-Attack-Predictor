from flask import Flask, render_template, request, redirect
import numpy as np
import pickle
import time

app = Flask(__name__)

# Load ML model
model = pickle.load(open("model.pkl", "rb"))

# In-memory user store (use a DB later)
users = {}

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    data = {
        "age": int(request.form.get("age")),
        "heart_rate": int(request.form.get("heart_rate")),
        "is_diabetic": int(request.form.get("is_diabetic")),
        "family_heart_problem_background": int(request.form.get("family_heart_problem_background")),
        "is_smoker": int(request.form.get("smoker")),
        "is_alcohol": int(request.form.get("is_alcohol")),
        "exercise_time": int(request.form.get("exercise")),
        "diet": int(request.form.get("diet")),
    }

    # Convert to array for model prediction
    data_array = np.array([[data[key] for key in data]])
    pred = model.predict(data_array)
    time.sleep(1)

    if pred == 0:
        return redirect("/success")
    return redirect("/failure")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        if username in users:
            return "⚠️ Username already exists!"
        users[username] = password
        return redirect("/login")
    return render_template("signup.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        if users.get(username) == password:
            return redirect("/")
        return "❌ Invalid credentials!"
    return render_template("login.html")


@app.route("/success")
def success():
    return render_template("success.html")


@app.route("/failure")
def failure():
    return render_template("failure.html")


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(debug=True)

app.run(debug=True, use_reloader=True)
