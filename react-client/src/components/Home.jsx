
import React, { Component } from 'react';
//
// this is the home page component
function Home(props) {


    return (
        <div>

            <h1>Welcome to MERN Stack Student/Course System</h1>
            <p>Manage student and course information with ease!</p>

        </div>
    );

}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default Home;