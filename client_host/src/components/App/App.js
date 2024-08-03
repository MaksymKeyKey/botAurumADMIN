import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsList from '../News/NewsList/NewsList';
import AddNews from '../News/AddNews/AddNews';
import EditNews from '../News/EditNews/EditNews';
import ScheludeList from '../Schelude/ScheludeList/ScheludeList';
import EditSchelude from '../Schelude/EditSchelude/EditSchelude';
import EditSeminar from '../Seminar/EditSeminar/EditSeminar';
import SeminarList from '../Seminar/SeminarList/SeminarList';
import UsersList from '../Users/UsersList/UsersList';
import MainPage from '../MainPage/MainPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" element={<NewsList />} /> */}
          <Route path="/" element={
            <>
                <MainPage/>
            </>
          } />
          <Route  path="/news" element={<NewsList/>}/>
          <Route  path="/seminar" element={<SeminarList/>}/>
          <Route  path="/users" element={<UsersList/>}/>
          <Route  path="/schelude" element={ <ScheludeList/>}/>
          <Route path="/add" element={<AddNews />} />
          <Route path="/edit/:id" element={<EditNews />} />
          <Route path="/editshelude/:id" element={<EditSchelude />} />
          <Route path="/editseminar/:id" element={<EditSeminar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
