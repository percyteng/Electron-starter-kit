const electron = require('electron');
// const {ipcRenderer} = electron;
const ul = document.querySelector('ul');
const React = require('react');
import { render } from 'react-dom'
import App from './components/app'
render(
    <App />,
    document.getElementById('app')
)

// ipcRenderer.on('item:add', function(e, item){
//     ul.className='collection';
//     const li = document.createElement('li');
//     li.className='collection-item'
//     const itemTxt = document.createTextNode(item);
//     li.appendChild(itemTxt);
//     ul.appendChild(li);
// })

// ipcRenderer.on('itemClear', function(){
//     ul.className='';
//     ul.innerHTML = '';
// })

// //remove item
// ul.addEventListener('dblclick', function(e){
//     e.target.remove();
//     if (ul.children.length === 0){
//         ul.className = '';
//     }
// })