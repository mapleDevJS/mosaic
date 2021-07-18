declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

// For CSS
declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}

// For SCSS
declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
