import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({Key? key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFFEDF3FB),
        elevation: 0,
        title: Padding(
          padding: EdgeInsets.only(left: 20.0),
          child: Center(
            child: Text(
              'Slogan da Empresa',
              style: TextStyle(
                fontSize: 18,
                color: Colors.black,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
        actions: [
          GestureDetector(
            onTap: () {},
            child: Padding(
              padding: EdgeInsets.only(right: 15.0),
              child: Text(
                'Entrar',
                style: TextStyle(
                  fontSize: 15.0,
                  color: Colors.blueAccent,
                  fontWeight: FontWeight.w800,
                  decoration: TextDecoration.underline,
                  decorationColor: Colors.blueAccent,
                  decorationThickness: 1.5,
                ),
              ),
            ),
          )
        ],
      ),
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Padding(
              padding: EdgeInsets.symmetric(vertical: 30.0),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(40),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.4),
                      spreadRadius: 6,
                      blurRadius: 6,
                      offset: Offset(5, 7),
                    )
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(15),
                  child: Container(
                    height: MediaQuery.of(context).size.height * 0.3,
                    child: Image.asset(
                      "assets/banner.jpg",
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
            ),
            Text(
              'Com problemas na sua máquina?',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.blueAccent,
              ),
              textAlign: TextAlign.center,
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10.0),
              child: Text(
                'Relate problemas, receba assistência rápida e acompanhe a resolução. Simplificando o suporte técnico.',
                style: TextStyle(
                  fontSize: 15,
                  color: Color.fromRGBO(17, 24, 39, 1),
                ),
                textAlign: TextAlign.center,
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10.0),
              child: ElevatedButton.icon(
                icon: Container(
                  child: Image.asset(
                    'assets/slogonGoogle.png',
                    width: 22,
                    height: 22,
                  ),
                ),
                label: Text(
                  'Continuar com o Google',
                  style: TextStyle(
                    color: Color.fromRGBO(17, 24, 39, 1),
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                onPressed: () {
                  // Ação quando o ícone do Google for pressionado
                },
                clipBehavior: Clip.none,
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(
                    Colors.white,
                  ),
                  minimumSize: MaterialStateProperty.all(Size(400, 50)),
                ),
              ),
            ),
            Container(
              child: Row(
                children: [
                  Expanded(
                    child: Divider(
                      color: Color.fromARGB(61, 0, 0, 0),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0),
                    child: Text(
                      'Ou',
                      style: TextStyle(
                        color: Color.fromARGB(61, 0, 0, 0),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Divider(
                      color: Color.fromARGB(61, 0, 0, 0),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10.0),
              child: ElevatedButton.icon(
                onPressed: () {},
                icon: Icon(
                  Icons.email_outlined,
                  color: Colors.blueAccent,
                ),
                label: Text(
                  'Registra com E-mail',
                  style: TextStyle(
                      color: Color.fromRGBO(17, 24, 39, 1),
                      fontWeight: FontWeight.bold,
                      fontSize: 16),
                ),
                style: ButtonStyle(
                    minimumSize: MaterialStateProperty.all(Size(400, 50))),
              ),
            )
          ],
        ),
      ),
    );
  }
}
