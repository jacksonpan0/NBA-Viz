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
                    PTI stands for player team impact. A novel formula is employed, comparing a single individual's contribution
                    against their entire team's statistic for that season.
                </p>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </>
    );
}

export default AboutPTI;
