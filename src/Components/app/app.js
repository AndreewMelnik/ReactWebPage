import { Component} from 'react'

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
      //имитируем данные пришедшие с сервера
    serverData:[
      {name: "John Smith", salary: 600, increase: false, like: false, id:1},
      {name: "Alfred Kohen", salary: 800, increase: false, like: false, id:2},
      {name: "Joe Black", salary: 300, increase: false, like: false, id:3}
    ],
    term:''
  }
  this.maxId = 4;
}
// удаляем элемент из массива с обьектами по id
deleteItem = (id)=> {
  this.setState(({serverData})=>{
    //сравниваем id из нашего массива данных с id элемента со страницы
    //  const index = data.findIndex(elem => elem.id === id);
    //Метод filter() создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции.
    return {
      serverData: serverData.filter(item => item.id !==id)
    }
  })
}

addItem = (name, salary) => {
  const newItem = {
      name: name,
      salary: salary,
      increase: false,
      like: false,
      id: this.maxId++
  }
  this.setState(({serverData}) => {
      const newArr = [...serverData, newItem];
      return {
        serverData: newArr
      }
  });
}
// 1) способ
// onToggleIncrease = (id) => {
//   this.setState(({serverData}) =>{
    // const index =serverData.findIndex(elem => elem.id === id);

    // const old = serverData[index];
    // // Берем все свойства old и разворачиваем их уже в новый объект
    // // Свойства записанные после "{...old,____}"- добавляются к старому объекту или заменяют предыдущие свойства
    // // Берем значение increase  и меняем на противоположное:
    // const newItem = {...old, increase: !old.increase};
    // const newArr = [...serverData.slice(0,index), newItem, ...serverData.slice(index+1)];
    // return{
    //   serverData:newArr
    // }
//   })
// }

onToggleIncrease = (id) => {
  this.setState(({serverData}) =>({
    serverData: serverData.map(item => {
    if (item.id === id){
      return {...item, increase: !item.increase}
    }
    return item;
  })
}))
}

onToggleRise = (id) => {
  this.setState(({serverData}) =>({
    serverData: serverData.map(item => {
    if (item.id === id){
      return {...item, like: !item.like}
    }
    return item;
  })
}))
}
// Метод для поиска:
searchEmp = (items, term) => {
    if(term.length === 0) {
      return items;
    }
// объяснение отображения поиска в 20 уроке посмотри, слишком долго писать:
    return items.filter(item => {
       return item.name.indexOf(term) > -1
    })
}

onUpdateSearch = (term) => {
  this.setState({term: term})
}

onPromoted =(like)=> {
  this.setState(({serverData})=>{
    return {
      serverData: serverData.filter(item => item.like)
    }
  })
}

onRichest =(salary)=> {
  this.setState(({serverData})=>{
    return {
      serverData: serverData.filter(item => item.salary > 1000)
    }
  })
}


 render() {
// чтобы в app.info добавить счетчик людей делаем две переменных:
// чтобы узнать кол-во премий исп-ем метод filter-создаем новый массив
// (item => item.increase)-перебираем каждый отдельный объект(item) и возвращаем только те, у которых increase-true(item => item.increase)
  const employees = this.state.serverData.length;
  const rewarded = this.state.serverData.filter(item => item.increase).length;
  const {serverData, term} = this.state;
  const visibleData = this.searchEmp(serverData, term);
  return (
    <div className="app">
        <AppInfo employees={employees} rewarded={rewarded} />

        <div className="search-panel">
            <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
            <AppFilter onPromoted={this.onPromoted} onRichest={this.onRichest}/>
        </div>
        
        <EmployeesList
        
        serverData={visibleData}
        onDelete ={this.deleteItem}
        onToggleIncrease ={this.onToggleIncrease}
        onToggleRise ={this.onToggleRise}/>
        <EmployeesAddForm onAdd={this.addItem}/>
    </div>
  );
}
 }

export default App;
