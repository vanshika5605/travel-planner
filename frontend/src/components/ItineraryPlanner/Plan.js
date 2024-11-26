import React from "react";
import "./Plan.css";

const Plan = () => {
  return (
    <div>
      {/* Take a Break Section */}
      <section className="take-a-break">
        <div className="image-grid-wrapper">
          <div className="image-grid">
            <div className="grid-1">
              <img
                className="image-item"
                src="/images/img5.jpg"
                alt="Loading..."
              />
              <img
                className="image-item"
                src="/images/img6.jpg"
                alt="Loading..."
              />
              <img
                className="image-item"
                src="/images/img7.jpg"
                alt="Loading..."
              />
            </div>
            <div className="grid-2">
              <img
                className="image-item"
                src="/images/img8.jpg"
                alt="Loading..."
              />
              <img
                className="image-item"
                src="/images/img9.jpg"
                alt="Loading..."
              />
            </div>
            <div className="grid-3">
              <img
                className="image-item"
                src="/images/img9.jpg"
                alt="Loading..."
              />
            </div>
          </div>

          <div className="text-content">
            <h1>Take a Break</h1>
            <p className="subtitle">
              Indulge in the freedom of exploration with our effortless booking
              platform.
            </p>
            <div className="button-group">
              <button className="cta-button">
                I already know my dream destination
              </button>
              <button className="cta-button">
                Need inspiration? Let us guide you
              </button>
            </div>
          </div>

          <div className="image-grid">
            <div className="grid-3">
              <img
                className="image-item"
                src="/images/img9.jpg"
                alt="Loading..."
              />
            </div>

            <div className="grid-2">
              <img
                className="image-item"
                src="/images/img8.jpg"
                alt="Loading..."
              />
              <img
                className="image-item"
                src="/images/img9.jpg"
                alt="Loading..."
              />
            </div>
            <div className="grid-1">
              <img
                className="image-item"
                src="/images/img5.jpg"
                alt="Loading..."
              />
              <img
                className="image-item"
                src="/images/img6.jpg"
                alt="Loading..."
              />
              <img
                className="image-item"
                src="/images/img7.jpg"
                alt="Loading..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Editor's Choice Section */}
      <section>
        <h2>Editor's Choice</h2>
        <div class="row">
          <div class="leftcolumn">
            <div class="card">
              <h2>TITLE HEADING</h2>
              <h5>Title description, Dec 7, 2017</h5>
              <div class="fakeimg" style={{ height: "200px" }}>
                Image
              </div>
              <p>Some text..</p>
            </div>
            <div class="card">
              <h2>TITLE HEADING</h2>
              <h5>Title description, Sep 2, 2017</h5>
              <div class="fakeimg" style={{ height: "200px" }}>
                Image
              </div>
              <p>Some text..</p>
            </div>
          </div>
          <div class="rightcolumn">
            <div class="card">
              <h2>About Me</h2>
              <div class="fakeimg" style={{ height: "100px" }}>
                Image
              </div>
              <p>
                Some text about me in culpa qui officia deserunt mollit anim..
              </p>
            </div>
            <div class="card">
              <h3>Popular Post</h3>
              <div class="fakeimg">Image</div>
              <br></br>
              <div class="fakeimg">Image</div>
              <br></br>
              <div class="fakeimg">Image</div>
            </div>
            <div class="card">
              <h3>Follow Me</h3>
              <p>Some text..</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plan;
