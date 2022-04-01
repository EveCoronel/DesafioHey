const exceljs = require('exceljs')
const moment = require('moment')
const fs = require('fs')



const guardarPedido = (number, message) => {

    const historialChat = `./pedidos/${number}.xlsx`;
    const workbook = new exceljs.Workbook();
    const today = moment().format('DD-MM-YYYY hh:mm')

    if (fs.existsSync(historialChat)) {
        workbook.xlsx.readFile(historialChat)
            .then(() => {
                const worksheet = workbook.getWorksheet(1);
                const lastRow = worksheet.lastRow;
                let getRowInsert = worksheet.getRow(++(lastRow.number))
                getRowInsert.getCell('A').value = today;
                getRowInsert.getCell('B').value = message;
                getRowInsert.commit();
                workbook.xlsx.writeFile(historialChat)
                    .then(() => {
                        console.log('Se agrego chat!');
                    })
                    .catch(() => {
                        console.log('Algo ocurrio guardando el chat');
                    })
            })
    } else {
        const worksheet = workbook.addWorksheet('Chats');
        worksheet.columns = [{
                header: 'Fecha',
                key: 'date'
            },
            {
                header: 'Mensaje',
                key: 'message'
            },

        ]
        worksheet.addRow([today, message])
        workbook.xlsx.writeFile(historialChat)
            .then(() => {
                console.log('Historial creado ! ');
            })
            .catch(() => {
                console.log('Algo fallo!');
            })
    }

}

exports.guardarPedido = guardarPedido;