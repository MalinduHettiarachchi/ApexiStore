import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.compose import ColumnTransformer

# Load and preprocess the dataset
file_path = 'E:/Projects/ApexiStore/backend/datasets/laptop_price.csv'
laptop_df = pd.read_csv(file_path, encoding='ISO-8859-1')

X = laptop_df[['Brand', 'Processor', 'RAM', 'GPU']]
y = laptop_df['Price_euros']

categorical_features = ['Brand', 'Processor', 'RAM', 'GPU']
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(), categorical_features)
    ])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = make_pipeline(preprocessor, LinearRegression())
model.fit(X_train, y_train)

def predict_price_and_details(brand, processor, ram, gpu):
    user_input = pd.DataFrame({
        'Brand': [brand],
        'Processor': [processor],
        'RAM': [ram],
        'GPU': [gpu]
    })
    predicted_price = model.predict(user_input)[0]
    
    # Find the details of the laptop
    laptop_details = laptop_df[(laptop_df['Brand'] == brand) &
                               (laptop_df['Processor'] == processor) &
                               (laptop_df['RAM'] == ram) &
                               (laptop_df['GPU'] == gpu)]
    
    if not laptop_details.empty:
        details = laptop_details.iloc[0].to_dict()
    else:
        details = {}
    
    return predicted_price, details

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    brand = data['brand']
    processor = data['processor']
    ram = data['ram']
    gpu = data['gpu']
    
    predicted_price, details = predict_price_and_details(brand, processor, ram, gpu)
    
    response = {
        "predicted_price": f"{predicted_price:.2f}",
        "details": details
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
