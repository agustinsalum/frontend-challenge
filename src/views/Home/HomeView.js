import React, { useState } from 'react';
import { withTranslation, useTranslation } from 'react-i18next'; 

import List from 'components/templates/List';

import CustomModal from '../../components/organisms/MyModal/CustomModal';


import './styles.scss';

const HomeView = () => {

    /* Indicates whether the modal is open or closed. It is initialized as false */
    const [isModalOpen, setIsModalOpen] = useState(false);

    /* handleOpenModal: Sets isModalOpen to true to open the modal */

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    /* handleCloseModal: Sets isModalOpen to false to close the modal */

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const elements = []; 
    const hasMore = false;

    const { t } = useTranslation();

    const welcomeMessage = (
        <div className="welcome-message-container">
            <div className="welcome-message">
            <h2>{t('Welcome to home')}</h2>
            </div>
            {/* A button that opens the modal */}
            <div className="welcome-message-button">
                <button onClick={handleOpenModal}>{t('modal Button')}</button>
            </div>
            <CustomModal
                open={isModalOpen}
                handleClose={handleCloseModal}
                title={t('My modal')}
            >
                {t('Modal by Agustin Salum')}
            </CustomModal>
            
        </div>
        
    );

    return (
        /* Used to structure the view */
        <List
            title={t('Home')}
            elements={elements}
            hasMore={hasMore}
            fetchMoreData={() => { }} 
            additionalContent={welcomeMessage}
        />
    );
}

export default withTranslation()(HomeView);
