module.exports = {
    purge: [],
    theme: {
        extend: {
            width: {
               '200': '200vh'
            },
            height: {
               '200': '200vh'
            }
        },
        boxShadow: {
            navBar: '0px 4px 20px #E6E6E6',
            input: '0px 4px 20px rgba(0, 0, 0, 0.1);',
            button: '0px 10px 20px #C9C9C9',
            toolBar: '0px 0px 10px #C9C9C9'
        },
        fontFamily: {
            sans: [
                '"Josefin Sans"',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                '"Noto Sans"',
                'sans-serif',
                'Ariel',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto Color Emoji"',
            ],
            mono: [
                'SFMono-Regular',
                'Menlo',
                'Monaco',
                'Consolas',
                '"Liberation Mono"',
                '"Courier New"',
                'monospace',
            ],
        },
        colors: {

            // blues
            blue: '#00B4F5',
            darkblue: '#047DA9',
            lightblue: '#A3E3FB',

            // reds
            darkred: '#EF0520',
            red: '#FF6173',
            lightred: '#FFBCC4',

            // greys
            bg: '#E5E5E5',
            grey1: '#F7F7F7',
            grey2: '#C9C9C9',
            grey3: '#A0A0A0',
            grey4: '#575757',
            black: '#303030',
            white: '#FFFFFF',
        }
    },
    variants: {},
    plugins: [],
}
