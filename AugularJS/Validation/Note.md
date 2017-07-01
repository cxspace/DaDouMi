# Exercise (Instructions): Angular Forms and Form Validation

### Exercise Resources

Contactus.html

### Objectives and Outcomes

In this exercise, you will learn more about Angular support for forms and form validation. You will also learn to use JavaScript to perform form validation. At the end of this exercise, you will be able to:

- Use Angular support for HTML forms
- Establish two-way data binding between form fields and JavaScript variables and object properties.
- Use Angular's support for form validation
- Use JavaScript to perform form validation in Angular.

### Setting up the Exercise

- Download contactus.html given above and put it in your *conFusion/app* folder. Open the page for editing.

### Adding Angular Forms Support

- Update the <html> tag to turn the page into an Angular app as follows:

```
<html lang="en" ng-app="confusionApp">
```

- Next, go to the body of the page, update the container div as follows:

```
<div class="container" ng-controller="ContactController">
```

- Next, go to the form, and update the enclosing div as follows:

```
<div class="col-xs-12 col-sm-9" ng-controller="FeedbackController">    
```

### Adding Controllers

- Open *app.js* and at the bottom of this page, add the two new controllers that we used in the page by inserting the following code:

```
       .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };
        }])

        .controller('FeedbackController', ['$scope', function($scope) {

        }]);
```

### Establishing Two-Way Data Binding

- Update the firstName input field as follows:

```
<div class="form-group">
    <label for="firstname" class="col-sm-2 control-label">First Name</label>
     <div class="col-sm-10">
          <input type="text" class="form-control" id="firstname" name="firstname" placeholder="Enter First Name" ng-model="feedback.firstName" required>
     </div>
</div>
```

- Update the lastName input field as follows:

```
         <div class="form-group">
                        <label for="lastname" class="col-sm-2 control-label">Last Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="lastname" name="lastname"  placeholder="Enter Last Name"
                        ng-model="feedback.lastName" required>
                        </div>
                    </div>
```

- Update the telephone number fields as follows:

```
     <div class="form-group">
                        <label for="telnum" class="col-sm-2 control-label">Contact Tel.</label>
                        <div class="col-xs-5 col-sm-4 col-md-3">
                            <div class="input-group">
                                <div class="input-group-addon">(</div>
                                    <input type="tel" class="form-control" placeholder="Area code"                                    ng-model="feedback.tel.areaCode">
                                <div class="input-group-addon">)</div>
                            </div>
                        </div>
                        <div class="col-xs-7 col-sm-6 col-md-7">
                                    <input type="tel" class="form-control" id="telnum" name="telnum" placeholder="Tel. number"
                                    ng-model="feedback.tel.number">
                        </div>
                    </div>
```

- Update the Email field as follows:

```
          <div class="form-group">
                        <label for="emailid" class="col-sm-2 control-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="emailid" name="emailid" placeholder="Email"
                            ng-model="feedback.email" required>
                        </div>
                    </div>
```

- Update the check box as follows:

```
         <div class="checkbox col-sm-5 col-sm-offset-2">
                            <label class="checkbox-inline">
                                <input type="checkbox"
                                ng-model="feedback.agree">
                                <strong>May we contact you?</strong>
                            </label>
                        </div>
```

- Update the textarea as follows:

```
    <div class="form-group">
                        <label for="feedback" class="col-sm-2 control-label">Your Feedback</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" rows="12"
                                ng-model="feedback.comments">
                            </textarea>
                        </div>
                    </div> 
```

- Update the small column to the right of the feedback form as follows:

```
       <div class="col-xs-12 col-sm-3">
              <h3>Your Current Feedback:</h3>
              <p>{{feedback.firstName}} {{feedback.lastName | uppercase }}</p>
              <p>Contact Tel.: ({{feedback.tel.areaCode}}) {{feedback.tel.number}}</p>
              <p>Contact Email: {{feedback.email}}</p>
              <p ng-show="feedback.agree">Contact by: {{feedback.mychannel}}</p>
              <p>Comments: {{feedback.comments}}</p>
            </div>
```

### Angular Form Validation

- Update the <form> tag as follows:

```
<form class="form-horizontal" name="feedbackForm" ng-submit="sendFeedback()" novalidate>
```

- Next, update the firstName form group as follows:

```
 <div class="form-group" ng-class="{ 'has-error' : feedbackForm.firstname.$error.required && !feedbackForm.firstname.$pristine }">
                         . . .

                        <span ng-show="feedbackForm.firstname.$error.required && !feedbackForm.firstname.$pristine" class="help-block">Your First name is required.</span>
                        </div>
                    </div>
```

- Update the lastname form group as follows:

```
       <div class="form-group" ng-class="{ 'has-error' : feedbackForm.lastname.$error.required && !feedbackForm.lastname.$pristine }">

                        . . .

                        <span ng-show="feedbackForm.lastname.$error.required && !feedbackForm.lastname.$pristine" class="help-block">Your Last name is required.</span>
                        </div>
                    </div>
```

- Then, update the emailid field as follows:

```
 <div class="form-group"  ng-class="{ 'has-error has-feedback' : feedbackForm.emailid.$invalid && !feedbackForm.emailid.$pristine }">

                        . . .

                        <span ng-show="feedbackForm.emailid.$invalid && !feedbackForm.emailid.$pristine" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                        <span ng-show="(feedbackForm.emailid.$invalid ||
                                        feedbackForm.emailid.$error.required) &&
                                        !feedbackForm.emailid.$pristine"
                             class="help-block">Enter a valid email address.</span>
                        </div>
                    </div>
```

- Update the checkbox and select form group as follows:

```
 <div class="form-group"  ng-class="{ 'has-error' : invalidChannelSelection }">                       <div class="checkbox col-sm-5 col-sm-offset-2">
                            <label class="checkbox-inline">
                                <input type="checkbox"
                                ng-model="feedback.agree">
                                <strong>May we contact you?</strong>
                            </label>
                        </div>
                        <div class="col-sm-3 col-sm-offset-1" ng-show="feedback.agree">
                            <select class="form-control"
                               ng-model="feedback.mychannel"
                               ng-options="channel.value as channel.label for channel in channels">
                                <option value="">Tel. or Email?</option>
                            </select>
                        <span ng-show="invalidChannelSelection" class="help-block">Select an option.</span>
                        </div>
                    </div>   
```

- Update the button in the form as follows:

```
               <button type="submit" class="btn btn-primary" ng-disabled="feedbackForm.$invalid">Send Feedback</button>
```

- Save the* contactus.html* file, and then open the *app.js* file. Update the controller code as follows:

```
        .controller('ContactController', ['$scope', function($scope) {
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                                }])
        .controller('FeedbackController', ['$scope', function($scope) {
                        $scope.sendFeedback = function() {
                                console.log($scope.feedback);
                                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
            
             $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }]);
                                
                                
```

- Save the file and then go and see the behavior of the web page.

### Conclusions

In this exercise, you learnt about Angular support for forms and form validation. You also learnt about doing form validation in the controller code using JavaScript.