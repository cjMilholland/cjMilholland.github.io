# AI Terminology and Definitions 
- Natural Language Processing (NLP)
NLP is the broader field focused on enabling computers to understand, interpret, and generate human language. NLP encompasses many techniques and tasks such as sentiment analysis, named entity recognition, and machine translation.

- Large Language Models (LLM)
LLMs are a powerful subset of NLP models characterized by their massive size, extensive training data, and ability to perform a wide range of language tasks with minimal task-specific training. Models like the Llama, GPT, or Claude series are examples of LLMs that have revolutionized what’s possible in NLP.

- Transformers
These are functions which are applied against the input data when training the model. For example if we are using images as your input you might have a transformer which resizes the images to a standard shape and size. 

- Classification Model
A classification model is going to return a prediction on if the input matches some case. For example if the image is of a cat or a dog. The result will be a number representing the quality of the prediction.

- Regression Model

- Metric (Quality Measurement)

- Loss

- Transfer Learning
Using a pretrained model for something it wasn't originally trained for. 

- Fine Tuning
The process of taking a pretrained model and updating it by training it with additional 'epochs'. 

- Back Propagating
- Stochastic Gradient Descent (SGD)
- Inference
- Diffusers
- Tokenizers
- Model Context Protocol (MCP)
- Segmentation
The analysis of ever pixel in am image attempting to 

- Label 
The data that we're trying to predict, such as "dog" or "cat"

- Architecture 
The _template_ of the model that we're trying to fit; the actual mathematical function that we're passing the input data and parameters to

- Model 
The combination of the architecture with a particular set of parameters

- Parameters 
The values in the model that change what task it can do, and are updated through model training

- Fit 
Update the parameters of the model such that the predictions of the model using the input data match the target labels

- Train 
A synonym for _fit_

- Pretrained model 
A model that has already been trained, generally using a large dataset, and will be fine-tuned

- Fine-tune 
Update a pretrained model for a different task

- Epoch 
One complete pass through the input data

- Loss 
A measure of how good the model is, chosen to drive training via SGD

- Metric 
A measurement of how good the model is, using the validation set, chosen for human consumption

- Validation set 
A set of data held out from training, used only for measuring how good the model is

- Training set 
The data used for fitting the model; does not include any data from the validation set

- Overfitting 
Training a model in such a way that it _remembers_ specific features of the input data, rather than generalizing well to data not seen during training

- CNN 
Convolutional neural network; a type of neural network that works particularly well for computer vision tasks

- Tabular 
Data that is in the form of a table, such as from a spreadsheet, database, or CSV file. A tabular model is a model that tries to predict one column of a table based on information in other columns of the table.

- Learning Rate