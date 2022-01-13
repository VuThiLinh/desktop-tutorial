import React, {useState} from 'react'
import styles from './scss/Todo.module.scss'

function TodoList({list,setState}) {
    
    const handleDelete = (index) =>{
        const newList = list.filter((item,i)=> index !=i);
        setState([...newList]);
    }

    const handleEdit = (index,value) => {
        list[index] = value;
        setState([...list]);
    }

    const Item = ({item,index}) => {
        const [isEdit,setIsEdit] = useState(false);
        const [value,setValue] = useState(item);
        const handleOnChange = (e) =>{
            setValue(e.target.value);
        }

        return(
            <ul className={styles.listTodo} key={index}>
                <li className={styles.todoItem}>
                    {item}                   
                </li>
                <div className={styles.task} style={{display: "flex"}}>
                    <p className={styles.edit} onClick={()=> setIsEdit(!isEdit)}>Sửa</p>
                    <p className={styles.delete} onClick={()=> handleDelete(index)}>Xóa</p>
                </div>
                {isEdit && (
                    <>
                        <input className={styles.editInput} value={value} onChange={handleOnChange}/>
                        <button className={styles.editSave} onClick={()=>handleEdit(index,value)}>save</button>
                    </>
                )}
            </ul>
        )
    }
    return (
        <div>
            {list.map((item,index) =>{
                return(
                    <Item item={item} index={index} key={index}/>
                )
            })}
        </div>
    )
}

export default TodoList
