import { Routes, Route } from 'react-router-dom';

import NotFound from '../pages/notFound/NotFound';
import Main from '../pages/main/Main';
import Redirect from '../pages/redirect/Redirect';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/:shortCode' element={<Redirect />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
