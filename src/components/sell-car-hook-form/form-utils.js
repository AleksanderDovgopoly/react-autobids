import {useState} from "react";
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";

export const useFormProgress = () => {
    const [currentStep, setCurrentStep] = useState(0)

    function goForward(event) {
        event.preventDefault();
        setCurrentStep(currentStep + 1);
    }

    function goBack(event) {
        event.preventDefault();
        setCurrentStep(currentStep - 1);
    }

    return [currentStep, goForward, goBack];
}

export const convertStateToHtml = (descriptions) => {
    let newDescriptionsObj = {};
    // eslint-disable-next-line array-callback-return
    Object.keys(descriptions).map((key) => {
        newDescriptionsObj[key] = draftToHtml(convertToRaw(descriptions[key].getCurrentContent()));
    })

    return newDescriptionsObj;
}