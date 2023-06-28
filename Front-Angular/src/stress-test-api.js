import http from "k6/http";
import { check } from "k6";

export function login(login, senha) {
    console.log(`VU ${__VU}: Fazendo login...`);
    const url = `http://192.168.0.24:4100/autenticar`;
    const payload = {};
    const headers = {
        "Content-Type": "application/json",
        login: login,
        password: senha,
        company: "1",
    };
    const response = http.post(url, payload, { headers: headers });
    check(response, {
        "response status is 200": (r) => r.status === 200,
    });
    const sessionId = response.headers["Session-Id"];
    console.log(`VU ${__VU}: Login realizado com sucesso. Status: ${response.status}, Tempo de resposta: ${response.timings.duration}ms`);
    const data = { sessionId, formGQ16Data: getAllFormGQ16(sessionId) };
    return data;
}

export function getAllFormGQ16(sessionId) {
    console.log(`VU ${__VU}: Buscando dados...`);
    const url = `http://192.168.0.24:4100/executarmetodo`;
    const payload = {
        empresa: "1",
        tipoExecucao: "EXECUTARMETODO",
        classe: "RegistroFormularioPPR_GQ16",
        metodo: "ConsultarTodosRegistros",
        parametros: [0],
    };
    const headers = {
        "Content-Type": "application/json",
        "Session-Id": sessionId,
    };
    const response = http.post(url, JSON.stringify(payload), { headers: headers });
    check(response, {
        "response status is 200": (r) => r.status === 200,
    });
    console.log(`VU ${__VU}: Dados encontrados. Status: ${response.status}, Tempo de resposta: ${response.timings.duration}ms`);
    return response.json();
}

export default function setup() {
    console.log(`VU ${__VU}: Iniciando teste...`);
    const { sessionId, formGQ16Data } = login("eme4", "mgemtmeme@4");
    console.log(`VU ${__VU}: Teste iniciado com sucesso.`);
    console.log('');
    return { sessionId, formGQ16Data };
}
