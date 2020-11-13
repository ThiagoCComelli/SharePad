import { store } from 'react-notifications-component';

const notification = (props) => {
    store.addNotification({
        title: props.title || "error",
        message: props.message || "error",
        type: props.type || "default",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2500,
          onScreen: true
        }
      })
}

export {notification}