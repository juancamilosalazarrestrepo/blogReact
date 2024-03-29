# Blog React

## Documentación de la Aplicación

Esta documentación proporciona una descripción general de la aplicación y su funcionalidad, así como información detallada sobre los componentes, funciones y dependencias utilizadas en la aplicación.

La aplicacion fue desplegada en aws en un bucket S3 , la puedes ver en el siguiente link : **http://jcsr-blog-react.s3-website.us-east-2.amazonaws.com/**

## Descripción General

Esta aplicación es un blog de articulos(posts), que permite listar inicialmente 100 posts en una tabla paginada, estos post son obtenidos con axios a través del metodo get de la api de https://jsonplaceholder.typicode.com/posts, tambien permite crear , editar y eliminar post , haciendo uso de los metodos post, put y delete de la misma api, estos metodos simulan modificar los datos en el servidor , pero realmente no lo hacen , para crear una experiencia real de creacion , edicion y eliminacion de posts , ademas de simular el consumo de sus respectivos metodos, hacemos uso de el state y tambien guardamos datos en el localStorage, para que al recargar la pagina no se pierdan las modificaciones al total de datos(posts)

Esta aplicacion fue hecha en **React** utilizando las siguientes dependencias para proporcionar una interfaz de usuario interactiva:

- React Router DOM
- React Hook Form
- Axios
- Material UI
- Material Icons

La aplicación también utiliza eslint como una dependencia de desarrollo para prevenir errores en el código y mantener un estilo de código uniforme.

el montaje del entorno de desarrollo fue creado con vite , ya que es una herramienta moderna que permite mejor experiencia al desarrollar ya que es muy rapida a la hora de lanzar la aplicacion cada vez que la iniciamos o editamos algo del codigo mientras esta iniciada.

## Configuración

1.  Clona el repositorio:

    Clona el repositorio utilizando el siguiente comando **git clone https://github.com/juancamilosalazarrestrepo/blogReact.git**

2.  Antes de ejecutar la aplicación, asegúrese de tener Node.js y npm instalados en su sistema.
3.  Para instalar las dependencias de la aplicación, ejecute el siguiente comando: **npm install**
4.  Para ejecutar la aplicación, ejecute el siguiente comando:**npm run dev**

## Experiencia de usuario

La aplicacion lista posts en una tabla paginada, cada post tiene un boton de editar y uno de eliminar. en la parte superior de la aplicaion se encuentra el menu de navegacion , el cual tiene dos links , uno llamado **Lista de posts** que dirige a la lista de post y otro llamado **crear posts** que nos dirige a un formulario con los campos de titulo y contenido y un boton que si le damos click y ya los campos estan diligenciados va a crear un nuevo post,
si los campos no estan diligenciados o no cumplen las validaciones , se mostrara un aviso de error en la parte de abajo del campo que no cumple con la validacion.

Cuando damos click en el icono de **editar** un post , nos dirige a un formulario en el cual se encuentran cargados los datos del post a editar, los campos del formularios son Titulo y Contenido, ademas cuenta con un boton que dice editar post el cual guardara los cambios realizados a dicho post.

cuando damos click en el boton de **eliminar** se elimina automaticamente el post seleccionado.

## Paginas

La aplicación utiliza varias paginas y componentes para proporcionar una interfaz de usuario interactiva. A continuación se describen las paginas y componentes principales utilizados en la aplicación:

### TablePage

Esta es la pagina principal donde se listan los posts inicialmente hace uso de los componentes NavBar y TablePost que describiremos mas adelante, ademas hace uso del componente Backdrop de MaterialUI para mostrar un loader mientras cargan los posts,
para cargar los posts hacemos uso del custom hook usePosts que nos devuelve los posts iniciales y el valor del loading en false cuando devuelve los posts. este valor de loading es que habilita o desabilita el Backdrop para que aparezca del loader (true:visible , false:cerrado).

### CreatePost

Esta pagina contiene el componente NavBar y un formulario que es el componente FormPost, esta pagina se usa a la hora de crear un nuevo posts y al editar un post, cuando se edita los campos del formulario contienen los datos del post a editar. estos datos del post a editar llegan a traves de un state que se envia por medio del metodo navigate cuando se le da click al icono de editar determinado post.

Cuando se da click al menu de **"Crear posts"** en el inicio(TablePage) se envia un estado con la lista completa de posts a la cual se le añaden los posts creados y luego se devuelven a la TablePage a través del state cuando se da click en navbar al menu **"lista de posts"**.
Cuando un posts es creado nos muestra un modal diciendo que el post fue creado con exito.

Esta pagina se muestra en la ruta "/create" pero se le añadio una proteccion para cuando la intenta ingresar digitando la ruta en el navegador, ya que de esta manera no llevario los estados de los posts para agregarles los que se crean. la proteccion se hace validando si state existe y si no redirige al inicio(TablePage) y nos muestra un modal(swal de la libreria sweet alert) diciendonos que no se puede ingresar a esa ruta de esa manera

### NotFoundPage

pagina sencilla que se muestra cuando se digita una ruta equivocada.queda pendiente a darle mas estilos y una nueva estructura.

## Componentes

### NavBar

Este componente es la barra de navegacion, se comparte usa en las TablePage y CreatePosts
Tiene dos links uno que dirige al inicio(TablePage) y otro que dirige a Crear posts(CreatePosts). al dar click en estos links se envian determinados estados para simular la experiencia del crud sastisfactoriamente ya que si no siempre se recargarian los mismo posts iniciales, esto no sucede ya que hacemos validaciones de que si existen estados , se utilicen estos para listar los posts, ya que traen los cambios a los post originales. los estados que se envian en la navegacion pueden provenir tambien del local storage para evitar que se borren si se recarga la aplicacion por medio del navegador.

### TablePosts

Este componente hace uso del componente Table de MaterialUI y de sus complementos para listar los post en una tabla paginada, a la cual se le pueden editar la cantidad de posts mostrados por pagina , tiene ademas botones de navegacion entre paginas y cada posts tiene botones de editar y de eliminar , cuando se le da click en eliminar se genera una peticion a la api a través del metodo delete de axios y ademas se filtran los post originales eliminando el posts que al que se le dio eliminar luego esto se guarda en el localStorage para evitar que reaparezca cuando se recargue la pagina por medio del navegador.

### FormPost

Este componente contiene el formulario para la creacion y edicion de posts , el titulo del formulario cambian dependiendo si el componente se esta usando para crear o para editar un posts, esto se logra validando si dentro del state se encuentra la propieda postToEdit, ademas si la porpiedad se llenan los campos con los datos de dicho post , y cuando se le da click al boton de editar(en este caso) se genera una peticion a la api usando el metodo put de axios y ademas se modifica en el array de posts que llego en el state , para luego devolverlos a la pagina de inicio ya modificados y que se muestren con los cambios, tambien se guarda dicho array en el localstorage para evitar perder cambios si se recarga la pagina.
Si la porpiedad postToEdit del state no existe, cuando se llenen los datos y se de click en el boton de crear , se hace una peticion a la api con el metodo post y se le envia la data del post a crear , ademas se agrega el post creado al array de posts que llego en el state y tambien se guardan estos posts ya con el nuevo agregado en el localstorage.

## Custom Hooks

### usePosts

este custom hook se usa para hacer una peticion get a la api y traer los posts iniciales para luego retornarlos cuando el hook sea llamado en la pagina de inicio.

## Dependencias

La aplicación utiliza las siguientes dependencias:

### React Router DOM

React Router DOM se utiliza para manejar la navegación en la aplicación.

### React Hook Form

React Hook Form se utiliza para manejar los formularios de la aplicación.

### Axios

Axios se utiliza para enviar solicitudes a la API.

### Material UI

Material UI se utiliza para proporcionar una interfaz de usuario atractiva y coherente.

### Material Icons

Material Icons se utiliza para proporcionar iconos para la interfaz de usuario.

### Sweet Alert

Sweet Alert se utiliza para generar modales de informacion cuando se crea , edita o elimina un post, tambien es utilizado para mostrar posibles errores por medio de modales.

### Dependecias de desarrollo

### eslint

Eslint se utiliza como una dependencia de desarrollo para prevenir errores en el código y mantener un estilo de código uniforme. es usado con la configuracion standard

### Prettier

Prettier es usada para dar formato al codigo , se configuro para solucionar ciertos conflictos con la configuracion standard del eslint.
