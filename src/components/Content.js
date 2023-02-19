import './Content.css';
import './List.css'
import React, { useState } from 'react';
import { v4 as uuid } from "uuid"; 
import Button_Add from './visuals/Button-Add.png';
import Drop from './visuals/Drop.png';
import Rectangle1 from './visuals/Rectangle1.png';
import Rectangle2 from './visuals/Rectangle2.png';
import Trash_Icon from './visuals/Trash-Icon.png';
import MoveBack_Icon from './visuals/MoveBack-Icon.png';

export default function Content() {
    const todos = [
    ];
    const dones = [
    ];
    const trashes = [
    ];

    const [showAdd, setShowAdd] = useState(false);
    const [showToDoDrop, setShowToDoDrop] = useState(false);
    const [selectedToDo, setSelectedToDo] = useState(null);
    const [showTrashDrop, setShowTrashDrop] = useState(false);
    const [selectedTrash, setSelectedTrash] = useState(null);
    const [showDoneDrop, setShowDoneDrop] = useState(false);
    const [selectedDone, setSelectedDone] = useState(null);
    const [activeToDo, setActiveToDo] = useState("Content-Nav__To-Do-active");
    const [activeDone, setActiveDone] = useState("Content-Nav__Done");
    const [activeTrash, setActiveTrash] = useState("Content-Nav__Trash");
    const [showToDo, setShowToDo] = useState(true);
    const [showDone, setShowDone] = useState(false);
    const [showTrash, setShowTrash] = useState(false);
    const [todoInput, setToDoInput] = useState("");
    const [listToDo, setListToDo] = useState(todos);
    const [listDone, setListDone] = useState(dones);
    const [listTrash, setListTrash] = useState(trashes);
    const [indexToDo, setIndexToDo] = useState(0);
    const [indexTrash, setIndexTrash] = useState(0);
    const [indexDone, setIndexDone] = useState(0);

    function showToDoDroped(key) {
        setSelectedToDo(key);
        setShowToDoDrop(!showToDoDrop);
        setIndexToDo(listToDo.findIndex((item) => item.key===key))
    }

    function showTrashDroped(key) {
        setSelectedTrash(key);
        setShowTrashDrop(!showTrashDrop);
        setIndexTrash(listTrash.findIndex((item) => item.key===key))
    }

    function showDoneDroped(key) {
        setSelectedDone(key);
        setShowDoneDrop(!showDoneDrop);
        setIndexDone(listDone.findIndex((item) => item.key===key))
    }

    function fromToDoToDone(key) {
        setListToDo((current) => current.filter((todo) => todo.key !== key));
        const index = listToDo.findIndex((item) => item.key===key);
        listDone.push(listToDo[index]);           
    }

    function fromDoneToToDo(key) {
        setListDone((current) => current.filter((done) => done.key !== key));
        const index = listDone.findIndex((item) => item.key===key);
        listToDo.push(listDone[index]); 
    }

    function fromToDoToTrash(key) {
        setListToDo((current) => current.filter((todo) => todo.key !== key));
        const index = listToDo.findIndex((item) => item.key===key);
        listTrash.push(listToDo[index]); 
        setIndexToDo(0);
    }

    function fromTrashToToDo(key) {
        setListTrash((current) => current.filter((trash) => trash.key !== key));
        const index = listTrash.findIndex((item) => item.key===key);
        listToDo.push(listTrash[index]); 
        setIndexTrash(0);
    }

    function fromDoneToTrash(key) {
        setListDone((current) => current.filter((done) => done.key !== key));
        const index = listDone.findIndex((item) => item.key===key);
        listTrash.push(listDone[index]); 
        setIndexDone(0);
    }

    function fromTrashToDelete(key) {
        setListTrash((current) => current.filter((trash) => trash.key !== key));
        setIndexTrash(0);
    }

    const changeStyleToDo = () => {     
        setActiveToDo("Content-Nav__To-Do-active");
        setActiveDone("Content-Nav__Done");
        setActiveTrash("Content-Nav__Trash");
    };

    const changeStyleDone = () => {     
        setActiveToDo("Content-Nav__To-Do");
        setActiveDone("Content-Nav__Done-active");
        setActiveTrash("Content-Nav__Trash");
    };

    const changeStyleTrash = () => {     
        setActiveToDo("Content-Nav__To-Do");
        setActiveDone("Content-Nav__Done");
        setActiveTrash("Content-Nav__Trash-active");
    };
    

    return (
        <div>
            <div className="Content">
                <div className="Content-Nav">
                    <button className={activeToDo} onClick={() => {
                        changeStyleToDo();
                        setShowToDo(true);
                        setShowDone(false);
                        setShowTrash(false);
                        }}>To Do</button>
                    <button className={activeDone} onClick={() => {
                        changeStyleDone();
                        setShowToDo(false);
                        setShowDone(true);
                        setShowTrash(false);
                    }}>Done</button>
                    <button className={activeTrash} onClick={() => {
                        changeStyleTrash();
                        setShowToDo(false);
                        setShowDone(false);
                        setShowTrash(true);
                    }}>Trash</button>
                </div>
                <div className="Content-Button">
                    {showAdd && <div className='Content-Button__Inputs'>
                            <div className='Content-Button__Input'>
                                <h4>Add New To Do</h4>
                                <input 
                                    placeholder="Your to-do" 
                                    type="text" 
                                    size = "25"
                                    value={todoInput} 
                                    onChange={(e) => setToDoInput(e.target.value)} 
                                />
                                <button onClick={() => {
                                    setToDoInput('');
                                    listToDo.push({
                                        key: uuid(),
                                        item: todoInput,
                                    })
                                    setShowAdd(!showAdd);
                                }}>Add</button>
                            </div>
                        </div>}
                    <img 
                        className="Content-Button__Add" 
                        src={Button_Add} 
                        alt=""
                        onClick={() => setShowAdd(!showAdd)}
                    />
                </div>
            </div>
            <div className='Content__Lists'>
                {showToDo && <div>
                        <h3>To Do</h3>
                        <div className='Content__Lists-ShadowLine'></div>
                        <div>                       
                            {listToDo.map((todo) => (
                                <div className='Content__Lists-ToDo' key={todo.key}>
                                    <button className='Content__Lists-ToDo_item'
                                        onClick={() => showToDoDroped(todo.key)}
                                    ><img src={Drop} alt=""/></button>
                                    {(listToDo[indexToDo].key === todo.key) && showToDoDrop && <button className="Content__Lists-ToDoDrop"
                                        onClick={() => {
                                            fromToDoToTrash(selectedToDo);
                                            setShowToDoDrop(false);
                                        }}
                                        ><img src={Trash_Icon} alt=""/>
                                        <p>Move to Trash</p>     
                                    </button>}
                                    <button className='Content__Lists-ToDo_item'
                                        onClick={() => fromToDoToDone(todo.key)}
                                    ><img  src={Rectangle1} alt=""/>
                                    </button>
                                    <p>{todo.item}</p>
                                </div>       
                            ))}    
                        </div>                       
                    </div>}
                {showDone && <div>
                        <h3>Done</h3>
                        <div className='Content__Lists-ShadowLine'></div>
                        <div>
                            {listDone.map((done) => (
                                <div className='Content__Lists-Done' key={done.key}>
                                    <button className='Content__Lists-Done_item'
                                        onClick={() => showDoneDroped(done.key)}
                                        ><img src={Drop} alt="" />
                                    </button>
                                    {(listDone[indexDone].key === done.key) && showDoneDrop && <button className="Content__Lists-ToDoDrop"
                                        onClick={() => {
                                            fromDoneToTrash(selectedDone);
                                            setShowDoneDrop(false);
                                        }}
                                        ><img src={Trash_Icon} alt=""/>
                                        <p>Move to Trash</p>     
                                    </button>}
                                    <button className='Content__Lists-Done_item'
                                        onClick={() => fromDoneToToDo(done.key)}>
                                        <img src={Rectangle2} alt=""/></button>
                                    <p>{done.item}</p>
                                </div>
                            ))}
                        </div>
                    </div>}
                {showTrash && <div>
                        <h3>Trash</h3>
                        <div className='Content__Lists-ShadowLine'></div>
                        <div>
                            {listTrash.map((trash) => (
                                <div className='Content__Lists-Trash' key={trash.key}>
                                    <button className='Content__Lists-Trash_item'
                                        onClick={() => showTrashDroped(trash.key)}>
                                        <img src={Drop} alt=""/>
                                    </button>
                                    {(listTrash[indexTrash].key === trash.key) && showTrashDrop && <div className="Content__Lists-TrashDrop">
                                        <button className='Content__Lists-TrashDrop-Buttons'
                                            onClick={() => {
                                                fromTrashToDelete(selectedTrash);
                                                setShowTrashDrop(false);
                                            }}
                                            ><img src={Trash_Icon} alt=""/>
                                            <p>Delete Forever</p>
                                        </button>
                                        <button className='Content__Lists-TrashDrop-Buttons'
                                            onClick={() => {
                                                fromTrashToToDo(selectedTrash);
                                                setShowTrashDrop(false);
                                            }}
                                            ><img src={MoveBack_Icon} alt=""/>
                                            <p>Move to To-Do</p>
                                        </button>   
                                    </div>
                                    }
                                    <button className='Content__Lists-Trash_item'>
                                        <img src={Rectangle2} alt=""/>
                                    </button>
                                    <p>{trash.item}</p>
                                </div>
                            ))}
                        </div>
                    </div>}
            </div>
        </div>
    );
};