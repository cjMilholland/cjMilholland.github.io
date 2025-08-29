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

----

I am going to break away from the above format as it is feeling a bit forced. 

This morning I focused on a few topics which I didn't fully grasp. 
Logistic Regression vs Linear Regression vs Binary Classification. 

As I understand it. 

Logistic Regress and Binary Classification are used when trying to perform a classification of data. E.G. Cat vs Dog photos. Pass vs Fail predictions. 

Linear Regression seems to be used when you are looking to fit a line to a dataset on two axis. This could be used for a home price prediction program. Square Footage vs Price. With the assumption that the size of the house is directly correlated to Price. You could use Linear Regression to "predict" the value of a random house by its square footage using historical data as the 'training data'. 

In Logistic Regression you attempt to classify data based on a calculated prediction ranging from 0 to 1. So you would feed X into the Logistic Regression function and it would return a value between 0 to 1 representing its prediction that the input matches whatever predetermined classification. 

The Neural Net is trained on labed data. For a Cat Classifier you would probably start with a dataset consisting of cat photos and dog photos. You feed this data into the Neural Networking and attempt to train the neural network to identify photos of cats. 

To do this you start with a random set of weights inside of the NN. Feed it a photo from your dataset and check its output against the known value. At this point you have one example of the success or failure rate of the current NN. We repeat this process for each photo in the dataset and averaging out the success or failure rate across the dataset to get an total success rate of the model. In the first round of random values we expect a very poor success rate from the model. The next step is to adjust the weights across the nodes and repeat the process seeing if the accuracy of the model has increased or decreased. 

An area I am still pretty weak on is the process of adjusting the weights so that we end up with a Classifier with the highest accuracy rate. I know that there is a process called Back Propagation which allows for us to identify what nodes have the largest impact to our wrongness of the prediction. Once we know what nodes impact the most we are able to make informed decisions on how to adjust the weights in the NN. We repeat this process multiple times until we identify the best weights in our NN. Finding the optimal weights for the NN involves a process call Gradient Descent. There are different types of Gradient Descents. The normal one makes small adjustments leveraging all of the vectors in the training data. THe problem with this is that you end up having to do a ton of calculations which increases as the size of the dataset increases. Someone realized that you can get pretty good results using a fixed number of randomly selected vectors from the dataset. When you view GD vs SGD working through the problem you see that the GD line is smooth as it has a 'higher resolution' but the SGD is very jagged and making very large changes in its weights but eventually finding a close to optimum NN. One thing that is interesting is that SGD's have been seen to perform better than GD in a lot of situations. The reason for this seems to be that it is possible for GD to find a local minimum which SGD ends up jumping over or out of during this random walk around the dataset. There are some papers I would like to look at which attempt to describe why SGD can be better than GD. Another win for SGD is that you end up spending much less time on training and also can do so at a predetermined amount of calculations irrelevant to changes in dataset size. 

What I would like to get a better understanding of is the terminology and explaining what is going on at each of these steps. I want to be able to talk the talk. 

__Next up we have Vectors__

Instead of going video by video I will just give an overall understand below of Vectors when I complete the associated videos. It is currently 1:18pm and course says I have 1h 49m of video. I watch the videos at 1.25 speed but I do tend to pause to think about things, do side searches etc. while also spending a minute to think in between videos. 

Watching the first video it is explained that while it is possible to work through a dataset using a For Loop when you leverage Vectorization you enable the ability to leverage parallelization on the CPU and GPU via SIMD (Single Instruction Multiple Data). To implement Vectorization you need to leverage a tool like the dot function in Numpy. The np.dot function has been optimized to leverage parallelization. So although it is possible to do the math needed using a python for loop Vectorization considerably increases the processing speed of the dataset. 

The next few videos discussed how to do more of this math using Python. The main example involves Broadcasting which is really just Pythons behavior when doing type changing to match the needed matrix sizes for the Vectorization to work as expected. 

