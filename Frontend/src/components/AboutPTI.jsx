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
                        PTI stands for player team impact.
                    </p>
                </div>
            )}
        </>
    );
}

export default AboutPTI;
