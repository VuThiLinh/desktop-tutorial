import { Link } from 'react-router-dom'
import styles from './scss/Login.module.scss'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import React, { useState } from 'react';

function Login() {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const navigate = useNavigate();
    const [error, setError] = useState("")

    const onSubmit = data => {
        console.log(data);
        fetch('https://mvn-task-manager.work/auth/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.code) {
                    localStorage.setItem("token",data.token);
                    navigate("/Todo");
                } else {
                    setError(data.message)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
        <div className={styles.container}>
            <h1 className={styles.heading}>ĐĂNG NHẬP</h1>
            <form className={styles.todoForm} onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: error ? "block" : "none" }}>{error}</div>
                <input className={styles.todoInput} type="text" placeholder="Username..."  {...register("username", { required: true, maxLength: 20 })}/><br />
                {errors.username && (<span>Username không hợp lệ</span>)}<br />               
                <input className={styles.todoInput} type="password" placeholder="Password..."  {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ })}/><br/>
                {errors.password && (<span>Password không hợp lệ</span>)}<br />
                <div className={styles.text}>
                    <p>Bạn chưa có tài khoản? Hãy <Link to="/Register">đăng ký!</Link></p>
                </div>
                <button className={styles.todoButton}>ĐĂNG NHẬP</button>
            </form>
        </div>
        </>
    )
}

export default Login