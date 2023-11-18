(async () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      document.querySelector('#playerName').textContent = userName;
      setDisplay('loginControls', 'none');
      setDisplay('playControls', 'block');
    } else {
      setDisplay('loginControls', 'block');
      setDisplay('playControls', 'none');
    }
  })();

function setDisplay(controlId, display) {
const playControlEl = document.querySelector(`#${controlId}`);
if (playControlEl) {
    playControlEl.style.display = display;
}
}

async function loginUser() {
    loginOrCreate(`/api/auth/login`);
    // window.location.href = "tasks.html";
  }
  
  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }
  
  async function loginOrCreate(endpoint) {

    const userName = document.querySelector('#userName')?.value;
    const password = document.querySelector('#userPassword')?.value;
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      localStorage.setItem('userName', userName);
      // if (endpoint==`/api/auth/create`) { user_login(); }
      user_login();
    } else {
      const body = await response.json();
      const modalEl = document.querySelector('#msgModal');
      modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
      const msgModal = new bootstrap.Modal(modalEl, {});
      msgModal.show();
    }
  }
  
  function goToTasks() {
    window.location.href = 'tasks.html';
  }
  
  function logout() {
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
  }
  
  async function getUser(email) {
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
  }




async function user_login() {


    const nameEl = localStorage.getItem('userName');
    const user = {
        username: nameEl,
        tasks: [],
        habits: []
    };
    let key_val = { key: nameEl, value: JSON.stringify(user)};

    await fetch('/api/updateDictionary', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(key_val),
    }).catch(error => console.error('Error in fetch:', error));

    


    // // console.log(document.querySelector("#input_username").value)
    // const nameEl = document.querySelector("#input_username").value;
    // const passwordEl = document.querySelector("#input_password").value; 

    // const user = {
    //     username: nameEl,
    //     password: passwordEl,
    //     tasks: [],
    //     habits: []
    // };

    // localStorage.setItem(nameEl, JSON.stringify(user));
    
    // // make it so their name shows up at the top
    // // localStorage.setItem("page_username", nameEl);
    // key_val = { key: "page_username", value: nameEl }
    // await fetch('/api/updateDictionary', {
    //     method: 'POST',
    //     headers: {'content-type': 'application/json'},
    //     body: JSON.stringify(key_val),
    // }).catch(error => console.error('Error in fetch:', error));



    window.location.href = "tasks.html";
}
