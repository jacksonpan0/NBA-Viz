import React, { useState } from 'react';

const AboutPTI = () => {
    const [clicked, setClicked] = useState(false);

    const handleButtonClick = () => {
        setClicked(!clicked);
    }

    return (
        <>
            <button onClick={handleButtonClick}>
                About PTI
            </button>
            {clicked && (
                <div>
                    <h2>What is PTI?</h2>
                    <p>
                        PTI stands for Pakistan Tehreek-e-Insaf, which translates to Pakistan Movement for Justice.
                        It is a political party in Pakistan founded by Imran Khan in 1996. The party's goal is to create
                        a modern, democratic welfare state.
                    </p>
                </div>
            )}
        </>
    );
}

export default AboutPTI;
