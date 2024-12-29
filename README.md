# ESTP

ligar o ambiente virtual

```bash
.\eb-virt\Scripts\activate   
```

correr frontend e backend

```bash

cd gbank/frontend/my-app
npm run build
cd ..
cd ..
python manage.py runserver
```

deploy

Em C:\Users\%UTILIZADOR%\.aws criei um arquivo chamado credentials com o seguinte conteudo

```plaintext
[default]
aws_access_key_id=****
aws_secret_access_key=****
aws_session_token=*****
```

O conteúdo do arquivo credentials é obtido no Vocaruem AWS Details

Depois de configurar o arquivo credentials, execute o seguinte comando para começar o deploy (SEM SSH)

```bash
eb init # regiao us-east-1
```

E depois

```bash
eb create django-env --service-role LabRole --keyname
vockey --instance_profile LabInstanceProfile
```

Para fazer o deploy

```bash
eb open
eb deploy
```

### Arquitetura

```plaintext
estp/
├── README.md
├── .devcontainer/
├── eb-virt/
│   └── Scripts/
│       └── activate
├── AWS/
│   ├── lamdafunctions/
│   │   ├── calculate_credit_score.py
│   │   ├── process_loan_request.py
│   │   ├── schedule_interview.py
│   │   ├── send_notification.py
│   │   └── validate_documents.py
│   └── stepfunctions/
│       └── stepfunction.json
└── gbank/
    ├── api/
    │   ├── __init__.py
    │   ├── views.py
    │   ├── serializer.py
    │   └── urls.py
    ├── base/
    │   ├── __init__.py
    │   ├── models.py
    ├── gbank/
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   ├── wsgi.py
    │   ├── asgi.py
    │   └── views.py
    ├── frontend/
    │   └── my-app/
    │       ├── public/
    │       │   ├── index.html
    │       │   ├── manifest.json
    │       │   └── robots.txt
    │       ├── src/
    │       │   ├── components/
    │       │   │   ├── Style/
    │       │   │   │   ├── Header.css
    │       │   │   │   ├── Footer.css
    │       │   │   │   └── Navbar.css
    │       │   │   ├── Header.js
    │       │   │   ├── Footer.js
    │       │   │   └── Navbar.js
    │       │   ├── pages/
    │       │   │   ├── Style/
    │       │   │   │   ├── Home.css
    │       │   │   │   ├── LoanRequests.css
    │       │   │   │   └── Login.css
    │       │   │   ├── Home.js
    │       │   │   ├── LoanRequests.js
    │       │   │   └── Login.js
    │       │   ├── App.js
    │       │   ├── App.css
    │       │   ├── App.test.js
    │       │   ├── index.js
    │       │   ├── index.css
    │       │   ├── logo.svg
    │       │   ├── reportWebVitals.js
    │       │   └── setupTests.js
    │       ├── .gitignore
    │       ├── package.json
    │       ├── package-lock.json
    │       └── README.md
    ├── debug.log
    └── manage.py
    ```