import React, { useCallback, useRef,useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";

import store, { selectTodos, addTodo, removeTodo } from "./store";
import { useTodos } from "./userTodo";
import "./App.css";
import Connexion from "./Connexion";
import './bootstrap.min.css';



const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box: React.FunctionComponent = ( children ) => (
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold",
    }}
  >
    children
  </div>
);

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
  }
> = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      backgroundColor: "green",
      color: "white",
      fontSize: "xx-large",
    }}
  >
    {title ?? children}
  </button>
);

function UL<T>({
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [user, setUser]=useState(null);
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  // const storage = localStorage.getItem(newTodoRef);
  // const taches:any[] = JSON.parse(storage);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch(
        addTodo(newTodoRef.current.value),
        
      );
      newTodoRef.current.value = "";
    }
  }, [dispatch]);

  
  return (
    
    
   
    <div>
      <Heading title="Todo List" />
      <div className="connexion">

        <Connexion setUser={setUser} />

       </div>
      <br />
      {
                user ?  <div className="tache">
                <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => (
          <>
          <div className="remove">
              {todo.text}
              
              <button onClick={() => dispatch(removeTodo(todo.id))}>
                Remove
              </button>
            </div>
          </>
        )}
      />
      <div className="btn">
        <label htmlFor="">Nom de la tache</label>
        <input type="text" ref={newTodoRef} /><br/>
 
        <Button   className=" btn-block buttonConnect" onClick={onAddTodo}>Add </Button>
      </div>
    </div> : ''
      }

</div>

      
  //  
  // user ?  <div className="tache">
  
  // <TacheToDo  setListe={setListe} ListeTaches={ListeTaches} setTache={setTabListe}/>
  // </div> : ''
  // }
  // <br />
  // {
  // liste === true ?  <div className="tache">
    

  // <Viewliste TabListe={[]} />

// </div> : ''
  );
}



 
const JustTheTodos = () => {
  const todos = useSelector(selectTodos);
  return (
    <UL
      items={todos}
      itemClick={() => {}}
      render={(todo) => <>{todo.text}</>}
    />
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
      }}
    >
      <App />
      <JustTheTodos />
    </div>
  </Provider>
);

export default AppWrapper;


// import React from "react";
// import "./App.css";
// import Store from "./store";


// interface ButtonProps
//   extends React.DetailedHTMLProps<
//     React.HTMLAttributes<HTMLButtonElement>,
//     HTMLButtonElement
//   > {
//   title?: string;
// }

// class Button extends React.Component<ButtonProps> {
//   render() {
//     return (
//       <button
//         style={{
//           background: "red",
//           color: "white",
//           fontSize: "1.5em",
//           padding: 10,
//           borderRadius: 5,
//           border: "none",
//         }}
//         {...this.props}
//       >
//         {this.props.title ?? this.props.children}
//       </button>
//     );
//   }
// }

// interface TimerProps {
//   duration: number;
// }

// class Timer extends React.Component<
//   TimerProps,
//   {
//     currentTime: number;
//     timer: NodeJS.Timeout | null;
//   }
// > {
//   static defaultProps = {
//     duration: 120,
//   };

//   startTime: number = 0;

//   constructor(props: TimerProps) {
//     super(props);
//     this.state = {
//       currentTime: 0,
//       timer: null,
//     };

//     this.onTick = this.onTick.bind(this);
//     this.onStop = this.onStop.bind(this);
//     this.onRestart = this.onRestart.bind(this);
//   }

//   componentDidMount() {
//     this.onRestart();
//   }

//   componentWillUnmount() {
//     if (this.state.timer) {
//       clearInterval(this.state.timer);
//     }
//   }

//   onTick() {
//     this.setState({
//       currentTime: Math.max(
//         Math.floor(this.props.duration - (Date.now() - this.startTime) / 1000),
//         0
//       ),
//     });
//   }

//   onRestart() {
//     this.startTime = Date.now();
//     this.setState({
//       timer: setInterval(this.onTick, 200),
//     });
//   }

//   onStop() {
//     if (this.state.timer) {
//       clearInterval(this.state.timer);
//     }
//     this.setState({
//       timer: null,
//     });
//   }

//   render() {
//     return (
//       <>
//         <p>Current time: {this.state.currentTime}</p>
//         <p>Duration: {this.props.duration}</p>
//         {this.state.timer ? (
//           <Button onClick={this.onStop}>Stop</Button>
//         ) : (
//           <Button onClick={this.onRestart}>Restart</Button>
//         )}
//       </>
//     );
//   }
// }

// function App() {
//   return (
//     <div className="App">
//       <Timer />,
//       {/* <store/> */}
//     </div>
//   );
// }

// export default App;
