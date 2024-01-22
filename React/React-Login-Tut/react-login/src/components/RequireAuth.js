import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  // auth?.user -> kullanıcının kimlik bilgilerini içeren bir nesnenin var olup olmadığını kontrol eder.
  // Eğer auth?.user varsa, bu kullanıcının yetkilendirilmiş olduğu anlamına gelir.
  // Eğer yetkilendirilmişse 'Outlet' bileşeni ile içerik görüntülenir.
  // Outlet alt bileşenleri render etmek için kullanılır.

  // state={{ from: location }} ifadesi, kullanıcının geldiği sayfanın bilgisini içerir.
  // state={{ from: location }} ifadesi, Navigate bileşenine bir durum (state) nesnesi ekler ve bu durum nesnesinin içine from alanını ekler. Bu alan, kullanıcının yönlendirildiği sayfanın bilgisini içerir.
  // Bu bilgi, kullanıcının giriş yaptıktan sonra, başlangıçta erişmeye çalıştığı sayfaya geri dönmesini sağlar.

  // replace -> Navigate bileşeni içinde kullanıldığında, tarayıcı geçmişindeki mevcut girişleri değiştirme işlevini ifade eder.
  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
