import { createElement } from 'react';

export const React = {
    createElement: createElement
}

export function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}