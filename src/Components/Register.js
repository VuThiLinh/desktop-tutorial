import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import styles from './scss/Login.module.scss'
import { Link } from 'react-router-dom'

function Register() {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false)

    const onSubmit = data => {
        fetch('https://mvn-task-manager.work/auth/register', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.code) {
                    setSuccess(true);
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>ĐĂNG KÝ</h1>
            <form className={styles.todoForm} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.todoInput} type="text" placeholder="Enter your username" {...register("username", { required: true, maxLength: 20 })} /><br />
                {errors.username && (<span>Username không hợp lệ</span>)}<br />
                <input className={styles.todoInput} type="password" placeholder="Enter your password" {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ })} /><br />
                {errors.password && (<span>Password tối thiểu 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường và 1 số</span>)}<br />
                <div className={styles.success} style={{display: success ? "block" : "none"}}>Bạn đã đăng kí thành công!</div>
                <button className={styles.todoButton}>ĐĂNG KÝ</button>
                <button className={styles.btnLog}><Link className={styles.linkNav} to={"/"}>ĐĂNG NHẬP</Link></button>
            </form>
        </div>
    )
}

export default Register