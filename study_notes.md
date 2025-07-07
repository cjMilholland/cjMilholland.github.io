# Study Notes and Learning Resources
## Resources
### Hugging Face Learning Courses - [https://huggingface.co/learn](https://huggingface.co/learn)
### Fast AI Practical Deep Learning - [https://course.fast.ai](https://course.fast.ai)

## Study Notes
### fastai Tutorials
#### fastai Tutorial Beginner - Computer Vision Intro
[https://docs.fast.ai/tutorial.vision.html](https://docs.fast.ai/tutorial.vision.html)

I will be following along with this tutorial on a dedicated Kaggle Notebook
[Link to my Kaggle Notebook](https://www.kaggle.com/code/cjmilholland/fastai-tutorial-beginner-computer-vision-intro)

To start the tutorial runs us through another Cat vs Dog Image classifier. 
I will following along with this although we have done it a couple of times already.

In this process we are using the Oxford Pet Dataset which is included in the fastai library via the URLs.PETS dataset.

After we untar this dataset we are left with two folders. /images and /annotations

In the /images directory we see 7390 files

In this dataset the way we identify a Cat photo vs a Dog photo is that the Cat photos start with an uppercase letter.
While the Dog photos start with a lowercase letter.

Now that we have these images we need to load this data into a dataloader objects. 
One of the needed parts of this is to label the images. 
For this we create a simple function which returns true or false based on the case of the first letter of the filename.

At the end of the Simple Cat identifier we have a model that seems to do a pretty good job of saying if the picture is that of a cat. 

Next we start working on a breed identifier. In the Oxford Pet Dataset each filename contains the breed of the Dog or Cat that is in the dataset. 

We are able to create a new DataLoader which labels each item based off of the breed that was extracted from the filename. 

This works as expected and is verified using dls.show_batch(). 

After this we modify the DataLoader to leverage data augmentation. 

> dls = ImageDataLoaders.from_name_re(path, files, pat, item_tfms=Resize(224))

to 

> dls = ImageDataLoaders.from_name_re(path, files, pat, item_tfms=Resize(460), batch_tfms=aug_transforms(size=224))

I don't understand what the value of this change is as the text just says it works better... 
it didn't see any faster to run the command. Maybe it impacts the training phase? Not sure.

In this situation when running the learning step on both versions of the Data Loaders I can't tell any difference in speed of processing. 

Next the tutorial comments on learning rate which can be checked by running 

learn.lr_find()

This returns a graph which shows Loss on the X axis and Learning Rate on the Y axis.
Using this the author selects a number to add to the fine_tune function. 
He selects 3e-3 which I don't understand because the base of the graph is like 10e-1 or 10e-3. 
At 10e-3 the graph starts to show a steep drop in Loss.
Unsure if these correlate.

Searching around I was able to find a forum post which linked to chapter 5 of the fastbook. 
In this chapter they have a section on learning rate which has slightly different code than what is in the beginner tutorial.

~
learn = vision_learner(dls, resnet34, metrics=error_rate)
lr_min,lr_steep = learn.lr_find(suggest_funcs=(minimum, steep))
print(f"Minimum/10: {lr_min:.2e}, steepest point: {lr_steep:.2e}")
~

When we run this a couple of times we get values ranging from 6e-3 to 3e-3. 
A comment on that forum thead suggested that fastai has noted that 3e-3 is a good starting point for the Learning Rate
I am running an experiment using two very different Learning Rate values

3e-7, 3e-3, 3e-1

> learn.fine_tune(2, 3e-7)

epoch	train_loss	valid_loss	error_rate	time
0	    5.277457	4.221473	0.967524	00:34
epoch	train_loss	valid_loss	error_rate	time
0	    5.268894	4.205616	0.971583	00:42
1	    5.253009	4.197446	0.970230	00:42

> learn.fine_tune(2, 3e-1)

epoch	train_loss	valid_loss	error_rate	time
0	    25.548103	122.896309	0.967524	00:35
epoch	train_loss	valid_loss	error_rate	time
0	    14.393309	5.444802	0.972260	00:41
1	    6.510090	112.211945	0.964817	00:41

> learn.fine_tune(2, 3e-3)

epoch	train_loss	valid_loss	error_rate	time
0	    4.448089	9.738280	0.954668	00:35
epoch	train_loss	valid_loss	error_rate	time
0	    4.234919	289.615112	0.944520	00:41
1	    4.103619	901.831726	0.937077	00:40

I don't think these rates look correct. 
I think I might need to create a new learn object for each pass of fine_tune.
Attempting again after creating a new learn model on each one. 

This time I will set the Learn Rate to the Steepest Point as returned by the lr_find function
In this case it lands right on 3.02e-03

> learn.fine_tune(2, 3.02e-03)

epoch	train_loss	valid_loss	error_rate	time
0	    1.306298	0.334893	0.107578	00:34
epoch	train_loss	valid_loss	error_rate	time
0	    0.539038	0.408261	0.117727	00:42
1	    0.330541	0.238117	0.073748	00:41

Next I will run one with the Learn Rate set to the Min value as found after rebuilding the learn object.

> learn.fine_tune(2, 1.00e-02) # Min Value

epoch	train_loss	valid_loss	error_rate	time
0	    0.943575	0.442757	0.117727	00:34
epoch	train_loss	valid_loss	error_rate	time
0	    1.050058	0.809551	0.221922	00:41
1	    0.581330	0.327122	0.086604	00:42

Next I will use 10e-6 as it is deep into the high flat part of the curve.

> learn.fine_tune(2, 10e-6)

epoch	train_loss	valid_loss	error_rate	time
0	    5.264610	4.111388	0.960758	00:34
epoch	train_loss	valid_loss	error_rate	time
0	    5.050147	3.906752	0.940460	00:41
1	    4.882547	3.808164	0.933694	00:42

Looking a the error rate we see the best results with the Learning Rate set to the steepest value.
Close but worse error rate when set to the Min value
A very high error rate when set to a value with a high Loss Rate and no real change in slope. 

I am going to run one more time against the Steepest point so that we have a clean model to proceed with. 
On this run we happened to end up with the same steepest point value. 
In the other runs the steepest point value did change but stayed near 3e-3

> learn.fine_tune(2, 3.02e-03)

epoch	train_loss	valid_loss	error_rate	time
0	    1.310646	0.350815	0.100135	00:34
epoch	train_loss	valid_loss	error_rate	time
0	    0.523176	0.374788	0.110284	00:42
1	    0.308650	0.239559	0.071042	00:42

With this last run using the steepest slope value we end up with basically the same Error Rate

I am going to increase the number of epochs to 5 and see what happens to the error rate.

> learn.fine_tune(5, 4.37e-03)

epoch	train_loss	valid_loss	error_rate	time
0	    1.129449	0.360709	0.111637	00:35
epoch	train_loss	valid_loss	error_rate	time
0	    0.486296	0.477927	0.132612	00:43
1	    0.520402	0.503782	0.133288	00:42
2	    0.351521	0.342123	0.095399	00:42
3	    0.196136	0.256487	0.071042	00:42
4	    0.106872	0.230444	0.066982	00:44

Using learn.show_results(max_n=20) I feel like the results are better.
But it is still pretty close to when we ran with 2 epochs. 
Not sure how much it improved. Error Rate is down about 0.004
Maybe that is great for just a few more minutes of training. 

Next the tutorial goes into a tool inside of the fastai library called 'Interpretation' 
One of the possible use case of this tool is to print out the top losses. Showing the image, the prediction and the actual.
I believe this could be used to help identify possible problems with the dataset used in training or Validation.

The next section in the Computer Vision Into tutorial is __Single-label classification with the data block api__.
This section just talks about how to leverage the DataBlock() module.

__Model-label classification__
This section leverages the [Pascal Dataset](http://host.robots.ox.ac.uk/pascal/VOC/) this dataset is a collection of different objects persons which appropriate labels. The goal of this section is to show you how to setup a model which detects an object and also draws a box around the object.

The dataset has been built and tested against for many years. A by product of this is that a retrospective document was written that does a great job of showing the performance of different object classifiers which were trained and tested using the Pascal dataset. [The PASCAL Visual Object Classes Challenge: A Retrospective](http://host.robots.ox.ac.uk/pascal/VOC/pubs/everingham15.pdf). I just skimmed over this document but my main two take away are that there is one method which is measured to be the best *NUS_SCM*. This method tests so much better than all other types of methods used in the competition in a broad since. The also find that combining multiple methods results in better performance in most all categories. What I didn't find but also didn't look hard for was anything discussing the changes in efficiency between using just the best method vs super methods. 

__Multi-Label Classification Section.__
In this section we ran through implementing a simple Multi Label model. 
It was trained on the Pascal dataset and returns a list of objects it thinks are in the image.
The success rate of this model isn't great but I think it might get better with something like moving video where it has multiple attempts at guessing. We could figure out average list and I would assume that would increase the likely hood of proper success.

__Segmentation__
Segmentation is much like Multi-Label Classification but we are attempting to figure out the labels for each pixel in the  

### Fast AI Practical Deep Learning Course - [https://course.fast.ai](https://course.fast.ai)
#### Online Course
- Lesson 1 [Getting started](https://course.fast.ai/Lessons/lesson1.html)

This lesson is partially based on Chapter 1 of the book which I just finished working through, notes can be seen below. 

The lesson starts out with a 90 minute YouTube video.

The start of this video is spent talking about the who of fastai. 

Eventually Jeremy starts to show some examples of what is possible with fastai. 

One of the things that I would like to loop back on is the Pytorch Image Models (timm). 
This looks to be a large collection of different image based models like ResNet and the sort. I believe most if not all of these have been trained on the ImageNet datasets. 


After watching the video I started playing around with building a blank Notebook. 
On this notebook I copied and pasted the example code to have clean start. 
In this example I changed it to Dog vs Cat. 
I did run into a couple of rate limiting challenges on DuckDuckGo. 
This resulted in 171 Cat Images and 193 Dog Images. 
Lack of a proper terminal made we decide to just roll with what we have. 
Looking at the photos returned it does seem like we are not getting a quality set of images returned.
I am going to move forward with training knowing this dataset is subpar

Running the code I realize I don't fully understand something. 
My expectation is that I would be able to feed it a Dog Photo and it would say thats a dog.
Then feed it a Cat photo and it would say that is a Cat. 
But what I am getting right now seems to be just is it a Cat or not response....

What I am going to do next is look at the fastai tutorial to see if it provides me with a better understanding.
I will add a section above specific to notes on the [fastai > Tutorial > Beginner > Computer Vision Into](https://docs.fast.ai/tutorial.vision.html)


TODO
[ ] "complete lesson 1"
[x] Setup Account on Kaggle
[x] Copy and Paste code to Build a Cat or Dog model on a Kaggle
[ ] Modify the code to have a Laycie or Colin or Jim Model
[ ] See about wrapping the model into a webpage were we take a photo on the phone and upload to the website.
[ ] docs.fastai.com
[ ] timm.fastai.com
[ ] Run through the fastai Beginner Tutorial
[ ] Check out RISE the Notebook extension that creates slides out of your notebook 
[ ] Build out a couple of models on random data to see how well we can make them work. 

#### BOOK / Google Colab Notebook - Deep Learning for Coders with fastat an PyTorch
This course is based on a book titled [The fastai book](https://github.com/fastai/fastbook). This book looks to be comprised of multiple Jupyter Notebooks with the expectation of you reading / running the notebooks via [Google Colab](https://colab.research.google.com).


 - [Introduction to Jupyter](https://colab.research.google.com/github/fastai/fastbook/blob/master/app_jupyter.ipynb)
 For people which haven't had a chance to play with a Jupyter Notebook it allows for you to run Python code inside of a written document. This results in an environment which makes testing and playing with Python code much more simple. Allowing you to have multiple scripts with notes and documentation inside of a single visual interface.

 This initial Jupyter Notebook goes over some of the basic usage and functionality of Jupyter. This is all ran inside of Google Colab allowing for you to get running with some simple tasks very quickly. Although it is possible to run these notebooks locally if you have a local Jupyter Server running, I will be attempting to follow along with this course using just Google Colab.

 - [Chapter 1, Intro](https://colab.research.google.com/github/fastai/fastbook/blob/master/01_intro.ipynb) 

This training course was created by Sylvain and Jeremy.

In this chapter they discuss some of the history of Neural Networks and the progress of the research over the years. 
They discuss that an early paper had caused some confusion and misunderstanding around the limitations of Neural Networks. The paper initially focused on how a single layer of neurons were incapable of approximating simple mathematical topics. The second part of the paper discusses how multiple layers of neurons inturn correct for these problems found when using a single layer of neurons. The outcome of this paper was that most readers held onto the idea that neural networks were not capable of some basic mathematical concepts. This is thought to have resulted in a pause in research due to the common misunderstanding. It wasn't until later that we started linking together multiple layers of neurons for research and training.

The authors of the course make a commitment to attempt to teach in a method that aligns with the book "Making Learning Whole". The method sounds interesting enough that I decided to pickup a cheap copy of the book for some side studying. I also have a general interest in what are the best ways transfer knowledge between interested parties. 

In this section they start to talk about what software we will need to leverage. The software which they have initially called out is PyTorch, fastai, and Jupyter. PyTorch is described as a low-level foundation library while fastai is library of high level functions which are built using the PyTorch library.

They advise that this book covers fastai version 2 which is a total rewrite of fastai providing many unique features.

Quickly we are dropped into running some code in the Jupyter Notebook which is said to do the following.

First we download a collection of dog and cat photos from a resource called [Oxford-IIIT Pet Dataset](https://www.robots.ox.ac.uk/~vgg/data/pets/). 

After the images are downloaded we then download a model which has been pretrained on 1.3 Million Images. I believe the URL was https://download.pytorch.org/models/resnet34-b627a593.pth

This file looks to be about 83 MB which is much smaller than I had expected considering what the size of the training dataset would be... 

Right now the projected time to run this on the Colab VM is about 30 minutes. I also believe this to be a CPU only machine. Once this training has completed I will attempt to flip the Colab VM to a GPU version and rerun the training to see how things are going.

While waiting for the training to complete I will try to find out more about this resnet34.... model. 

ResNet is a model based on the [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385) research paper. Glancing through the paper it looks like they describe a number of models which have different layer counts. If I am interpreting the data correctly it looks like the higher the number of layers the better the error rate, although there does look to be a point of diminishing returns in regards to layer count. There is a table which shows the number of parameters related to the number of layers and it also seems that the parameters increases at almost a linear rate as the number of layers in this situation.

Looping back to the Google Colab notebook it seems like the CPU only instance timed out or possibly ran into some issues. I decided it would be best to terminate the instance and start one using the T4 GPU instance type.

Total runtime of the sample code found in the was about 3 minutes total. I might attempt to run the training again later on the CPU only VM just to see if it is possible. 

After training the model it was possible to test the fine tuned model by providing it a photo of a dog that I had taken a few weeks back along with another photo of cat that I had taken in the past as well. Both of these images were correctly identified with 100% probability. 

I am wondering if it is possible to run this test without the fine tuning... 

Further into this chapter there is discussion around some terminology and architecture of AI Programs / Models. They talk about Arthur Samuel who wrote a paper called "[Artificial Intelligence: A Frontier of Automation](https://dacemirror.sci-hub.ru/journal-article/920dd8d2e953058b2e4bf0c5a19c1519/samuel1962.pdf)" (NOTE: This is a PDF on some .ru website) in 1962. In this essay he is said to comment on the idea of manually updating weights and how this process could be automated allowing for an almost hands off training process. I think that although the essay is a fun read it shouldn't be considered a required reading for the learning and understanding of AI and or Deep Learning. Basic take away is that automation of the modification of weights "Automated Learning" is fairly important to the rapid creation of a 'successful' model.

Next there is a discussion around the idea of Positive Feedback Loops which you can easily run into while using and further training a model. They provide an example of building a crime prediction model and training it on data that represents past arrest locations. This might seem well and good but in reality we would end up in a model that would recommend further policing in areas which already have high arrest rates thus resulting in even higher arrest rates which would then compound after the next cycle of training on the model as new data is available. So the goal was originally to create a model which predicts the location of future crime, but in turn it just increases arrest rates in areas of already high rates of arrest. All because of a positive feedback loop that was created with the accidental use of incorrect inputs and success validation. 

There is a section which takes time to run through and explain each line of code from the prior cat vs dog example. 

Next to take some time to discuss and explain what the Cat vs Dog model had learned in our training process. They touch on the fact that a lot of people assume that the resulting model is nothing more than black box which can't be inspected to better understand why it resulted in the prediction it did. They rebut this idea by talking about the research documented in a paper called [Visualizing and Understanding Convolutional Networks](https://dacemirror.sci-hub.ru/journal-article/920dd8d2e953058b2e4bf0c5a19c1519/samuel1962.pdf). I haven't read over this paper at this time but it dives into analysis on the different layers of a model called AlexNet which is a 5 layer image recognition model that looks to consist of edge detection in the first layer, more pattern shape detection in the second layer, specific objects in the third layer, further detailed items like animals and cards in the forth layer, and the most detailed subjects in the last fifth layer. 

The course authors then go on to talk about how when doing fine tuning on a pre trained model you end up removing one or more of the last layers and replacing them with new layers which are fitted to your newly provided training data. The goal is to keep most of the magic which is provided with the pre trained model like edge detection while ensuring that the resulting model is able to accomplish your expected tasks. 

> As I read over the Visualizing and Understanding Convolution Networks I am realizing that I am starting to recognize some of the names like Donahue. If I remember I will start to build out a page keeping track of the different authors and see what there other work looks like. 

The main take away from the Visualizing and Understanding Convolution Networks it is pretty clear that running a deeper analysis while training can result in the identification of a possible improvement. The researchers in the paper had come to the conclusion that the first layer of the 2012 ImageNet model could be modified to result in a better performing model. Although most of the content covered in the paper was well beyond my comprehension I felt it should be considered a required read when deep diving into AI. 

Signing off for the night. 

Another use case of Image Recognizers is to take data in one form and convert it to an image and see if it is possible to fine tune a pre trained model with this converted data. They provide a couple of examples one based on created spectrograms from audio clips and another by representing malware in a gray scale image which is a very interesting way to go about things. Link to the Malware paper [Malware Classification with Deep Convolutional Neural Networks](https://ieeexplore.ieee.org/abstract/document/8328749)

I will say that chapter one is proving to be a very useful learning resource so far for me. 

When it comes to identifying the location specific objects and things in images we need to leverage a segmentation model. The example leverages a dataset called 'Camvid' which is discribed in a paper called [Semantic Object Classes in Video: A High-Definition Ground Truth Database](http://www0.cs.ucl.ac.uk/staff/G.Brostow/papers/Brostow_2009-PRL.pdf)

In the code example they are leveraging the pre-trained model ResNet34. It is leveraging a function called *unet_learner(dls, resnet34)*. Looking at the fastai website the unet_learner function ties back to the Vision Learner provided by the fastai library.

Running this round of training against the ResNet34 pre trained with the CAMVID_TINY dataset. The training process ran through 8 Epochs which tool only 20 seconds to run which I found to be pretty impressive. We then are able to run a validation which I don't fully understand but the results do look very promising. 

CamVid stands for Cambridge-driving Labeled Video Database. This is a dataset which consists of 10 minutes of 30 fps HD video which has been labeled on 32 different object classifications. The content was filled from the viewpoint of a car. 

Next we start to play around with Text via Natural Language Processing (NLP)

With this example they leverage the IMDB dataset which is described in a paper called [Learning Word Vectors for Sentiment Analysis](https://ai.stanford.edu/~ang/papers/acl11-WordVectorsSentimentAnalysis.pdf) and pass that through a *text_classifier_learner* which accepts the training dataset and a Architecture which looks to be set to the value of **AWD_LSTM** which is described in a paper [Regularizing and Optimizing LSTM Language Models](https://arxiv.org/abs/1708.02182)

The resulting output from this AI training is a model which attempts to identify if the text is positive or negative. 

When testing this I took a couple different paragraphs from news articles to see what the model responded with. Basically ever paragraph I tried from different news articles resulted in a response of Positive from the trained model. But when grabbing random restaurant reviews we see this works pretty well. I would like to better understand some of the numbers that it returns along with its identification of positive or negative sentiment. I did provide a couple middle of the road reviews which seemed to return numbers around .5, I would like to understand if that means it is like a 50% pos and 50% neg... Actually further reading shows that the two numbers are a representation of percentage positive and percentage negative. 

This is very interesting and would make me wonder how we could use this to identify viewer sentiment during live sporting events. Would we be able to identify comments specific to stream quality vs complaints or praise of the event itself???

We then go on to show an example of using tabular data as a training source. They provide an example of a way to provide movie predictions but no specific tooling to easy logical testing. I didn't run this code. 

We then start to wrap things up with a section on Validation Sets and Test Sets. This section touches specifically on the need for a set of data that the model was not trained on. As testing the model against data it was trained on would result in inaccurate success / failure data.

They offer up a great bit of insight around ensuring that you always have a 'Test Set' of data which is never seen by anyone and remains totally hidden. This is useful in multiple instances but the most powerful example is needing this to test a model which is returned by a third party. The goal being that the third party never sees this data so they are not able to fit the model for this specific dataset. 

They also recommend if you are planning on leveraging a third party to develop your model you should first attempt to build a simple model of your own to better understand what baseline performance looks like. 



 - [Chapter 2, Production](https://colab.research.google.com/github/fastai/fastbook/blob/master/02_production.ipynb) 
 - [Chapter 3, Ethics](https://colab.research.google.com/github/fastai/fastbook/blob/master/03_ethics.ipynb) 
 - [Chapter 4, MNIST Basics](https://colab.research.google.com/github/fastai/fastbook/blob/master/04_mnist_basics.ipynb) 
 - [Chapter 5, Pet Breeds](https://colab.research.google.com/github/fastai/fastbook/blob/master/05_pet_breeds.ipynb) 
 - [Chapter 6, Multi-Category](https://colab.research.google.com/github/fastai/fastbook/blob/master/06_multicat.ipynb) 
 - [Chapter 7, Sizing and TTA](https://colab.research.google.com/github/fastai/fastbook/blob/master/07_sizing_and_tta.ipynb) 
 - [Chapter 8, Collab](https://colab.research.google.com/github/fastai/fastbook/blob/master/08_collab.ipynb) 
 - [Chapter 9, Tabular](https://colab.research.google.com/github/fastai/fastbook/blob/master/09_tabular.ipynb) 
 - [Chapter 10, NLP](https://colab.research.google.com/github/fastai/fastbook/blob/master/10_nlp.ipynb) 
 - [Chapter 11, Mid-Level API](https://colab.research.google.com/github/fastai/fastbook/blob/master/11_midlevel_data.ipynb) 
 - [Chapter 12, NLP Deep-Dive](https://colab.research.google.com/github/fastai/fastbook/blob/master/12_nlp_dive.ipynb) 
 - [Chapter 13, Convolutions](https://colab.research.google.com/github/fastai/fastbook/blob/master/13_convolutions.ipynb) 
 - [Chapter 14, Resnet](https://colab.research.google.com/github/fastai/fastbook/blob/master/14_resnet.ipynb) 
 - [Chapter 15, Arch Details](https://colab.research.google.com/github/fastai/fastbook/blob/master/15_arch_details.ipynb) 
 - [Chapter 16, Optimizers and Callbacks](https://colab.research.google.com/github/fastai/fastbook/blob/master/16_accel_sgd.ipynb) 
 - [Chapter 17, Foundations](https://colab.research.google.com/github/fastai/fastbook/blob/master/17_foundations.ipynb) 
 - [Chapter 18, GradCAM](https://colab.research.google.com/github/fastai/fastbook/blob/master/18_CAM.ipynb) 
 - [Chapter 19, Learner](https://colab.research.google.com/github/fastai/fastbook/blob/master/19_learner.ipynb) 
 - [Chapter 20, conclusion](https://colab.research.google.com/github/fastai/fastbook/blob/master/20_conclusion.ipynb)

### Hugging Face LLM Course - [https://huggingface.co/learn/llm-course](https://huggingface.co/learn/llm-course)
The Hugging Face LLM Course recommends a good understanding of Python, completion of a prior introduction course to Deep Learning like fast.ai's course, but does not require any previous experience with PyTorch or TenserFlow.

I will take a little break from the Hugging Face LLM Course and spend some time running through the [https://course.fast.ai](https://course.fast.ai) curriculum.

#### Hugging Face LLM Course Section 1. Transformer Models
*NLP (Natural Language Processing)* is the broader field focused on enabling computers to understand, interpret, and generate human language. NLP encompasses many techniques and tasks such as sentiment analysis, named entity recognition, and machine translation.

*LLMs (Large Language Models)* are a powerful subset of NLP models characterized by their massive size, extensive training data, and ability to perform a wide range of language tasks with minimal task-specific training. Models like the Llama, GPT, or Claude series are examples of LLMs that have revolutionized what’s possible in NLP.