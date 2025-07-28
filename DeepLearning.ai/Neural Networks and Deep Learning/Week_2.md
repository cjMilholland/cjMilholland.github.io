Week 1 was a quick intro that had a couple of questions at the end.
We touched on the idea of CNN, RNN, Supervised Learning vs Unsupervised learning.
There was also an interview with Geoffrey Hinton which was pretty informing.

The first video in Week 2 is

__Logistic Regression as a Neural Network - Binary Classification__

Logistic Regression is an algorithm of Binary Classification.

Binary Classification allows for the output of the model to respond with a true or false in regards to a classification question of the input. E.G. Picture of Cat?

What is a Feature Vector?

This is a matrix or list which contains a set of values. 
The example given was the storage of pixel values in an image. 
This image is 64px by 64px represented via 8 bit RGB.
The resulting size of the Feature Vector is 64x64x3 = 12288
This is Width x Height x Color Layers
This is represented as Nx or N for short
Nx = Dimension of Input Feature Vector

M = Number of training samples or EPOCHs
X = Input
Y = Output
Mtrain = Training Data
Mtest = Test Data - Used for testing the model with unique data

__Logistic Regression as a Neural Network - Logistic Regression__
This is used when the Y value is expected to be a 0 or 1. 

The video further covers some of the math which makes up the sigmoid function that returns a 0 or 1 based on an input. 

__Logistic Regression as a Neural Network - Logistic Regression Cost Function__
In this video he speaks on the importance of a good Loss (error) Function.
It is possible to implement a loss function which results in a non convex result. 
The example loss function was the squared error function. 
The non convex result has multiple local bottoms which can cause gradient decent to not find the global optimal value. 

A Loss Function tells you how well you are doing on a single training sample.

A Cost Function tells you how well your parameters W and B are doing on the entire training set. 
It is an average of all Loss Functions

__Logistic Regression as a Neural Network - Gradient Descent__


What is W and B?

The goal is to find the best values of w,b which minimizes the output of the Cost Function.

Gradient Descent is a Convex Function
The inital values used should be a random point in the output. 
This is because that the expected output is Convex meaning that any point will eventual lead to the global optimum value due to following the slop of the function to the global min. When using non convex functions you need to identify a better way to select starting values as a random value may result in finding a local optimum but not the global optimum.

The main job of GD is to slowly step towards the lowest point of a curve. 

__Logistic Regression as a Neural Network - Derivatives__
