import React, { useState } from 'react';
import Modal from 'react-modal';
import emailjs from 'emailjs-com';

const Contact = () => {
    const [clicked, setClicked] = useState(false);
    const [form, setForm] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });

    const handleButtonClick = () => {
        setClicked(!clicked);
    }

    const closeModal = () => {
        setClicked(false);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_px0xcug', 'template_i9kguqx', e.target, 'S3d9jS4UCqWli7n-r')
            .then((result) => {
                console.log(result.text);
                closeModal();
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <>
            <a onClick={handleButtonClick} className='ContactButton'>
                Contact
            </a>
            <Modal
                isOpen={clicked}
                onRequestClose={closeModal}
                contentLabel='Contact Form'
                className='ContactModal'
                overlayClassName='Overlay'
            >
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type='text' name='user_name' value={form.user_name} onChange={handleChange} required />
                    </label>
                    <label>
                        Email:
                        <input type='email' name='user_email' value={form.user_email} onChange={handleChange} required />
                    </label>
                    <label>
                        Message:
                        <textarea name='message' value={form.message} onChange={handleChange} required />
                    </label>
                    <button type='submit'>Send</button>
                </form>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </>
    );
}

export default Contact;
