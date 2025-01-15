import React, { useState } from 'react';
import Modal from 'react-modal';

const AboutPTI = () => {
    const [clicked, setClicked] = useState(false);

    const handleButtonClick = () => {
        setClicked(!clicked);
    }

    const closeModal = () => {
        setClicked(false);
      };

    return (
        <>
            <a onClick={handleButtonClick} className='PTIButton'>
                About PTI
            </a>
            <Modal
                isOpen={clicked}
                onRequestClose={closeModal}
                contentLabel='About PTI'
                className='PTIModal'
                overlayClassName='Overlay'
            >
                <h2>What is PTI?</h2>
                <p>
                    A novel formula, using both advanced and traditional NBA statistics, is employed to compare a single player's
                    contribution relative to their teammates throughout a single season. The PTI range is from 0 to 1, with 1
                    indicating that a player has contributed the majority to a team's success in a single season and vice versa.
                    All PTI scores are relative to within the team thus values are not affected by opponent strength or outside factors.
                </p>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </>
    );
}

export default AboutPTI;
