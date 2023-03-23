import { convertNumberToUppercase } from "../packages";
const object = {
    a: [{ 'b': { 'c': 1 } }, { 'b2': { 'c': 2 } }],
    b: 1,
    c: { 'c': 3 },
    d: [
        '2.0',
        ['old d.1'],
        ['2.2.0', '2.2.1']
    ]
};
const array = [
    '0',
    '1',
    [
        '2.0',
        ['2.1.0'],
        ['2.2.0', '2.2.1']
    ]
]


window.onload = () => {
    console.log(convertNumberToUppercase(12345))
}