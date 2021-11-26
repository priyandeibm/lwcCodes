import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    myquestions = [
        {
            id:"Question1",
            question:"which of the following is not a template loop",
            answers:{
                a: "for-each",
                b: "iterator loop",
                c: "map loop"
            },
            correctanswer: "c"
        },
        {
            id:"Question2",
            question:"hich of the following is not file in LWC",
            answers:{
                a: ".svg",
                b: ".apex",
                c: ".js"
            },
            correctanswer: "b"
        },
        {
            id:"Question3",
            question:"which of the following is not a directive",
            answers:{
                a: "for-each",
                b: "if:true",
                c: "@track"
            },
            correctanswer: "c"
        }
    ]
    //When we want something to be dynamic then we must use getter function
    get isScoredfull(){
        return `slds-text-heading_large ${this.myquestions.length === this.correctans ? 
        'slds-text-color_success':'slds-text-color_error'}`
    }
    get allNotselected(){
        return !(Object.keys(this.selected).length === this.myquestions.length)
    }
    //create an object property to store the 3 answers
    selected = {}
    correctans = 0
    issubmitted = false
    //as known whenever any answer selected the changehandler caputres them here
    //So we create going to go with object destructuring concept here 
    changehandler(event){
        console.log("event is", event.target.name)
        console.log("value is",event.target.value)
        const {name,value} = event.target //object destructuring
        //now the selected option need to store in the "selected" property
        this.selected = {...this.selected, [name]:value}
    }
     //form submit handler
    SubmitHandler(event){
        //since the submit button is inside the form tag and whenever we click submit button 
        //the form refreshes page so we need to handle/prevent them
        event.preventDefault()
        this.issubmitted = true
        //going to use filter (an array which return true if the expression matches) on each questions, taking each questions as item, 
        //'this.selected' is where we are storing the answers
        let correct = this.myquestions.filter(item=>this.selected[item.id] === item.correctanswer)
        this.correctans = correct.length
        console.log("this.correctans",this.correctans)

    }
    //form reset handler
    ResetHandler(){
        this.selected ={}
        this.correctans = 0
        this.issubmitted = false
    }

}