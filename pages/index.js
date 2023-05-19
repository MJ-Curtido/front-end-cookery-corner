import React from 'react';
import { userStore } from '../store/userStore';

export default function Home() {
  const user = userStore(state => state.user);

  console.log(user);

  const signin = userStore(state => state.signin);
  const login = userStore(state => state.login);
  const logout = userStore(state => state.logout);
  const updateUser = userStore(state => state.updateUser);
  const deleteUser = userStore(state => state.deleteUser);

  return (
    <>
      {/* User petitions */}
      <p>{user ? user.name : 'null'}</p>

      <br/>
      <br/>

      <p>Sign in   <button onClick={() => {signin('Roberto Caravaca Herrera', 'roberto@gmail.com', 'Contrasenya17', '654987654')}}>Click</button></p>
      <br/>
      <p>Log in   <button onClick={() => {login('roberto@gmail.com', 'Contrasenya17')}}>Click</button></p>
      <br/>
      <p>Log out   <button onClick={() => {logout()}}>Click</button></p>
      <br/>
      <p>Update user   <button onClick={() => {updateUser('Robe', '', '', '')}}>Click</button></p>
      <br/>
      <p>Delete user   <button onClick={() => {deleteUser()}}>Click</button></p>
    </>
  )
}
