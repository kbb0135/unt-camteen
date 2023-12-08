import React from "react"

const Feedback = () => {
    return (
        <div className="feedback-page">
            <h1>Give us your feedback</h1>
        <form >
          <div>
            <label for="feedback_fullname">Full name:</label>
            <input type="text" id="feedback_fullname" placeholder="Full name" />
          </div>
          <div>
            <label for="feedback_email">Email:</label>
            <input type="email" id="feedback_fullname" placeholder="Email" />
          </div>
          <div>
            <label for="feedback_comments">Comments:</label>
            <textarea
              id="feedback_fullname"
              placeholder="Comments"
            />
          </div>
        </form>
      </div>
    );
}
export default Feedback; 