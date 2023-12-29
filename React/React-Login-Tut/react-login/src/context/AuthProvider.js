// Context API:
// React Context API, React uygulamalarında bileşenler arasında veri paylaşımını kolaylaştırmak için kullanılan bir API'dir.
// Bu API, veri paylaşımını kolaylaştırmak ve prop drilling denilen durumu önlemek için tasarlanmıştır.
// Prop drilling, bir bileşenin içindeki bir veriyi, o bileşenden başka bir bileşene iletirken tüm hiyerarşi boyunca prop'ları geçirmek anlamına gelir.
// Context API bu durumu geliştiricilere daha kolay bir şekilde yönetme imkanı sağlar.
// Context, bir veri deposu olarak düşünülebilir.
// Ana bileşenler veya uygulamanın genelinde paylaşılmak istenen veriler bu depoda saklanır ve bu verilere herhangi bir alt bileşenden erişim sağlanabilir.

// createContext Fonksiyonu: Bir context oluşturmak için kullanılır. Bu fonksiyon bir context nesnesi ve içinde bir Provider ve bir Consumer bileşeni bulunan bir nesne döner.
// Provider Bileşeni: Verileri paylaşmak istediğiniz bileşenlerin etrafına sarılır. Bu bileşen aracılığıyla verileri sağlar.
// Consumer Bileşeni: Paylaşılan verilere erişmek isteyen bileşenler için kullanılır. Bu bileşen, Provider bileşeni tarafından sağlanan verilere erişim sağlar.
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    // Provider, içindeki elemanlara veri sağlar.
    // AuthContext.Provider bileşeni, içindeki elemanlara (auth ve setAuth) değer sağlar. Bu sayede içerideki alt bileşenler (children) bu değerlere erişebilirler.
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// Kodun amacı, auth ve setAuth değerlerini içeren bir yetkilendirme bağlamı oluşturarak, bu değerlere erişimi AuthProvider bileşeni aracılığıyla sağlamaktır.
// Bu genellikle yetkilendirme durumu gibi uygulama genelinde paylaşılan verileri yönetmek için kullanılır.
