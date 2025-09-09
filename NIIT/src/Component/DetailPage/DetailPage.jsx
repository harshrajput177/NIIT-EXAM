import React from "react";
import "../DetailPage/DetailPage.css";
import { useNavigate } from "react-router-dom";

function DetailPage() {
    const navigate = useNavigate();

  return (
    <div className="test-container">
      {/* Timer and Header */}
      <div className="header">
        <h3>
          TIME LEFT ON THIS PAGE:- <span className="red-text">06 Min 39 Sec</span>
        </h3>
        <br />
        <p>CURRENT DATE AND TIME &nbsp; 25 Aug ,2025 &nbsp; 02:03:54 PM</p>
      </div>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-card">
          <h2>65</h2>
          <p>Minutes to take this test</p>
        </div>
        <div className="stat-card">
          <h2>5</h2>
          <p>Sections</p>
        </div>
        <div className="stat-card">
          <h2>56</h2>
          <p>Questions to be solved</p>
        </div>
        <div className="stat-card">
          <h2>1</h2>
          <p>Attempt</p>
        </div>
      </div>

      {/* General Instructions */}
      <div className="instructions">
        <h4>GENERAL INSTRUCTIONS:</h4>
        <ul className="main-instructions">
          <li>Total Questions in the test are 56.</li>
          <li>Total Test Duration is 65 Minutes.</li>
          <li>There are <b>5 Sections</b> in this Test and the breakup of sections is mentioned below.</li>
          <li>Once you move to the next section, you will not be able to return to the same section.</li>
        </ul>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Section Name</th>
              <th>No. of Questions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Verbal Ability</td>
              <td>1 to 15</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Analytical Ability</td>
              <td>16 to 30</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Numerical Ability</td>
              <td>31 to 45</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Written English Test</td>
              <td>46</td>
            </tr>
    
          </tbody>
        </table>

        {/* Notes */}
        <ul  className="INSTRUCTION-I">
          <li>There will be no <b>Negative Marking</b> for wrong answers.</li>
          <li>You can submit your test whenever you complete it. However, if the allotted time elapses, the system will automatically submit your test.</li>
          <li><b>Do not close any window directly</b> when you are taking the test.</li>
          <li>Please play the audio clip below before proceeding with the test to ensure it is working properly.</li>
        </ul>
      </div>

   <button onClick={() => { navigate("/QuizePage") }} className="submit-btnss">
  Start Assesment
</button>

    </div>
  );
}

export default DetailPage;
