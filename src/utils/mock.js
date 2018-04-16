import Mock from 'mockjs';

export default Mock.mock('http://localhost:3000', {
    'name': '@name',
    'age|1-100': 100,
    'color': '@color'
});