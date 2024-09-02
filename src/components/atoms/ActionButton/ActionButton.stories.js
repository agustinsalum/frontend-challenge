import React from 'react';

import ActionButtonComponent from '.';

export default {
    title: 'Atoms/ActionButton'
}

export const Default = () => {
    return <ActionButtonComponent legend={'Register'} />
}

export const Cancel = () => {
    return <ActionButtonComponent className="button-cancel" legend={'Register'} />
}