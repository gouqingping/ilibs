import { setValue, getValue, isDevice } from "../packages";
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

console.log('Device:', isDevice())
console.log('old d.1:', getValue(object, 'd.1'))

window.onload = () => {
    setValue(object, 'd.1', '')
    console.log('object:', object)
    console.log('new d.1:', getValue(object, 'd.1'))
    setValue(array, '2.2', 4)
    console.log('array:', array)
}