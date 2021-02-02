
class BaseInfo {
    constructor() {
        this.op_w = 40
        this.op_h = 40
        this.op_v_space = 30
        this.op_h_space = 150
        this.op_box_size = 32
        this.op_dot_box_size = 10
    }
}

function qbit_h_line(ctx, bi, x, y) {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#999"
    ctx.beginPath();
    ctx.moveTo(x * bi.op_w + bi.op_h_space, y * bi.op_h + bi.op_v_space);
    ctx.lineTo((x + 1) * bi.op_w + bi.op_h_space, y * bi.op_h + bi.op_v_space);
    ctx.stroke();
}

function qbit_v_line(ctx, bi, x, y) {
    ctx.lineWidth = 2
    ctx.strokeStyle = "#999"
    ctx.beginPath();
    ctx.moveTo((x + 1) * bi.op_w + bi.op_h_space, y * bi.op_h + bi.op_v_space);
    ctx.lineTo((x + 1) * bi.op_w + bi.op_h_space, (y + 1) * bi.op_h + bi.op_v_space);
    ctx.stroke();
}

function register_v_line(ctx, bi, x, y1, y2, reg_num, w) {

    ctx.lineWidth = 2
    ctx.strokeStyle = "#999"
    ctx.beginPath();
    ctx.moveTo(bi.op_h_space - bi.op_w - w / 2 - 5, y1 * bi.op_h + bi.op_v_space-3);
    ctx.lineTo(bi.op_h_space - bi.op_w - w / 2 - 5, y2 * bi.op_h + bi.op_v_space+3);
    ctx.stroke();

    ctx.fillStyle = "#fff"
    ctx.font = "bold 13px serif";
    var ss = "Reg" + reg_num;
    var metrics = ctx.measureText(ss);
    var width = metrics.width;
    var yy = (y1 * bi.op_h + bi.op_v_space + y2 * bi.op_h + bi.op_v_space) / 2
    ctx.fillText(ss, bi.op_h_space - bi.op_w - width - 28, yy)
}

function qbit_rect(ctx, bi, x, y, s, s2) {
    ctx.lineWidth = 2
    ctx.strokeStyle = "#aaa"
    if (s == "H") ctx.fillStyle = "#622d18"
    else if (s == "S") ctx.fillStyle = "#0075c2"
    else if (s == "P") ctx.fillStyle = "#006a6c"
    else if (s == "W") ctx.fillStyle = "#387d39"
    else if (s == "R") ctx.fillStyle = "#c70067"
    else if (s == "N") ctx.fillStyle = "#4d4398"
    else if (s == "X" || s == "Y" || s == "Z") ctx.fillStyle = "#202f55"

    else ctx.fillStyle = "#fff"
    ctx.fillRect((x + 1) * bi.op_w + bi.op_h_space - bi.op_box_size / 2, y * bi.op_h + bi.op_v_space - bi.op_box_size / 2, bi.op_box_size, bi.op_box_size)
    ctx.strokeRect((x + 1) * bi.op_w + bi.op_h_space - bi.op_box_size / 2, y * bi.op_h + bi.op_v_space - bi.op_box_size / 2, bi.op_box_size, bi.op_box_size)
    ctx.fillStyle = "#fff"
    ctx.font = "bold 14px serif";
    var metrics = ctx.measureText(s);
    var width = metrics.width;
    ctx.fillText(s, (x + 1) * bi.op_w + bi.op_h_space - width / 2, y * bi.op_h + bi.op_v_space + 5)
    if (s2 != null) {
        ctx.font = "bold 6px serif";
        metrics = ctx.measureText(s2);
        width = metrics.width;
        ctx.fillText(s2, (x + 1) * bi.op_w + bi.op_h_space - width / 2, y * bi.op_h + bi.op_v_space + 13)
    }
}

function dot_rect(ctx, bi, x, y) {
    var arc_r = 6
    ctx.beginPath()
    ctx.fillStyle = "#999"
    ctx.arc((x + 1) * bi.op_w + bi.op_h_space - bi.op_dot_box_size / 2 + arc_r,
        y * bi.op_h + bi.op_v_space - bi.op_dot_box_size / 2 + arc_r,
        arc_r, 0, 360, false)
    ctx.fill()
}

function qbits_text(ctx, bi, x, y, s) {
    ctx.fillStyle = "#fff"
    ctx.font = "bold 13px serif";
    var metrics = ctx.measureText(s);
    var width = metrics.width;
    ctx.fillText(s, x * bi.op_w + bi.op_h_space - width - 5, y * bi.op_h + bi.op_v_space + 5)
}

function toHex(v, max) {
    var tmp = max.toString(16)
    var l = tmp.length
    zero_format = ""
    for (var i = 0; i < l; i++) {
        zero_format += '0'
    }
    return '0x' + ((zero_format + v.toString(16).toUpperCase()).substr(-l));
}

function qbits_num_text(ctx_q, x, y, s) {
    var arc_r = 15
    var space = 5
    var left_space = 80

    ctx_q.fillStyle = "#fff"
    ctx_q.font = "bold 13px serif";
    var metrics = ctx_q.measureText(s);
    var width = metrics.width;
    ctx_q.fillText(s, left_space - width - 10, (space + arc_r) + (space + arc_r * 2) * y + 2)
}

function qbit_circle(ctx_q, x, y, p, rad) {

    var arc_r = 15
    var space = 5
    var left_space = arc_r + 80


    var deg = 180 / Math.PI * rad
    var deg2 = deg - 180
    var rad2 = Math.PI / 180 * deg2

    ctx_q.beginPath()
    ctx_q.fillStyle = "#000";
    ctx_q.arc(left_space + (space + arc_r * 2) * x, (space + arc_r) + (space + arc_r * 2) * y, arc_r, 0, (Math.PI / 180) * 360, false);
    ctx_q.fill();

    ctx_q.beginPath()
    ctx_q.strokeStyle = "#ffffff";
    ctx_q.lineWidth = 1;
    ctx_q.arc(left_space + (space + arc_r * 2) * x, (space + arc_r) + (space + arc_r * 2) * y, arc_r, 0, (Math.PI / 180) * 360, false);
    ctx_q.stroke();

    ctx_q.beginPath()
    ctx_q.strokeStyle = "#ccc";
    if (deg >= 0 && deg < 180) ctx_q.fillStyle = "#7fffbf";
    else ctx_q.fillStyle = "#ff7f7f";
    ctx_q.arc(left_space + (space + arc_r * 2) * x, (space + arc_r) + (space + arc_r * 2) * y, arc_r * p, 0, (Math.PI / 180) * 360, false);
    ctx_q.fill()

    ctx_q.beginPath()
    ctx_q.strokeStyle = "#ccc";
    ctx_q.lineWidth = 2;
    ctx_q.moveTo(left_space + (space + arc_r * 2) * x, (space + arc_r) + (space + arc_r * 2) * y);
    ctx_q.lineTo(left_space + (space + arc_r * 2) * x + Math.sin(rad2) * arc_r, (space + arc_r) + (space + arc_r * 2) * y + Math.cos(rad2) * arc_r);
    ctx_q.stroke();
}

function draw_circuit(test_json) {
    let cvs = document.getElementById("cv");
    let ctx = cvs.getContext("2d");

    bi = new BaseInfo()

    qbits_map = {}
    var max_h = 0
    var max_qbit_num = 0
    for (var i = 0; i < test_json.registers.length; i++) {
        for (var j = 0; j < test_json.registers[i].qbits.length; j++) {
            qbits_map[test_json.registers[i].qbits[j]] = max_h
            max_h++
            max_qbit_num = test_json.registers[i].qbits[j]
        }
    }

    var v_len = test_json.registers.length

    //calculate circuit width
    current_x = 0
    hit_qbits = false
    var hit_qbits_array = {}
    for (var x = 0; x < test_json.operations.length; x++) {
        var op = test_json.operations[x]

        if (hit_qbits_array[op.target_qbit]) {
            hit_qbits = true
            hit_qbits_array = {}
        }else{
            hit_qbits_array[op.target_qbit] = true
        }

        if (hit_qbits || op.control_qbits != null || op.op_name == "S") {
            hit_qbits = true
            current_x++
            if (op.control_qbits == null && op.op_name != "S") {
                hit_qbits = false
            }
        }
    }
    var max_w = current_x + 1

    //change canvas size
    cvs.width = max_w * bi.op_w + 2 * bi.op_h_space
    cvs.height = max_h * bi.op_h + bi.op_v_space

    //draw the register names and lines
    var rs = toHex(max_qbit_num, max_qbit_num)
    var rm = ctx.measureText(rs);
    var rwidth = rm.width;
    var ql = 0
    for (var i = 0; i < v_len; i++) {
        var tmp = test_json.registers[i].qbits.length
        register_v_line(ctx, bi, 0, ql + i, ql + i + tmp - 1, i + 1, rwidth)
        ql += tmp - 1
    }

    //draw the qbit's names and lines
    var k = 0
    for (var i = 0; i < v_len; i++) {
        for (var y = 0; y < test_json.registers[i].qbits.length; y++) {
            for (var x = 0; x < max_w; x++) {
                qbit_h_line(ctx, bi, x, k)
            }
            qbits_text(ctx, bi, 0, k, toHex(test_json.registers[i].qbits[y] >> test_json.registers[i].shift, max_qbit_num))
            k++
        }
    }

    //draw vertical lines
    var current_x = 0
    var hit_qbits = false
    hit_qbits_array = {}
    for (var x = 0; x < test_json.operations.length; x++) {
        var op = test_json.operations[x]

        if (hit_qbits_array[op.target_qbit]) {
            hit_qbits = true
            hit_qbits_array = {}
        }else{
            hit_qbits_array[op.target_qbit] = true
        }

        if (hit_qbits || op.op_name == "S" || op.control_qbits != null) {
            hit_qbits = true
            current_x++
            if (op.control_qbits == null && op.op_name != "S") {
                hit_qbits = false
            }
        }
        if (op.op_name == "S") {
            yy = qbits_map[op.target_qbit]
            ty = qbits_map[op.swap_qbit]
            if (ty >= yy) {
                for (var j = yy; j < ty; j++) {
                    qbit_v_line(ctx, bi, current_x, j)
                }
            } else {
                for (var j = ty; j < yy; j++) {
                    qbit_v_line(ctx, bi, current_x, j)
                }
            }
        }
        if (op.control_qbits != null) {
            for (var i = 0; i < op.control_qbits.length; i++) {
                yy = qbits_map[op.control_qbits[i]]
                ty = qbits_map[op.target_qbit]
                if (ty >= yy) {
                    for (var j = yy; j < ty; j++) {
                        qbit_v_line(ctx, bi, current_x, j)
                    }
                } else {
                    for (var j = ty; j < yy; j++) {
                        qbit_v_line(ctx, bi, current_x, j)
                    }
                }
            }
        }
    }

    //draw operations
    current_x = 0
    hit_qbits = false
    hit_qbits_array = {}
    for (var x = 0; x < test_json.operations.length; x++) {
        var op = test_json.operations[x]

        if (hit_qbits_array[op.target_qbit]) {
            hit_qbits = true
            hit_qbits_array = {}
        }else{
            hit_qbits_array[op.target_qbit] = true
        }

        if (hit_qbits || op.control_qbits != null || op.op_name == "S") {
            hit_qbits = true
            current_x++
            if (op.control_qbits == null && op.op_name != "S") {
                hit_qbits = false
            }

        }
        y = qbits_map[op.target_qbit]
        var s = null
        if (op.options != null || op.op_name == "W" || op.op_name == "R") {

            if (op.op_name == "P") {
                if (op.options[0] != 0) {
                    s = "x" + op.options[0] + "°"
                } else if (op.options[1] != 0) {
                    s = "y" + op.options[1] + "°"
                } else {
                    s = "z" + op.options[2] + "°"
                }
            } else if (op.op_name == "R") {
                s = op.options[0]
            } else if (op.op_name == "W") {
                s = "1"
            }

            qbit_rect(ctx, bi, current_x, y, op.op_name, s)
        } else {
            if (op.op_name == "S") {
                qbit_rect(ctx, bi, current_x, qbits_map[op.swap_qbit], op.op_name)
            }

            qbit_rect(ctx, bi, current_x, y, op.op_name)
        }
        if (op.control_qbits != null) {
            for (var z = 0; z < op.control_qbits.length; z++) {
                var y2 = qbits_map[op.control_qbits[z]]
                if (op.op_name == "P" || op.op_name == "X" || op.op_name == "Y" || op.op_name == "Z"){
                    qbit_rect(ctx, bi, current_x, y2, op.op_name, s)
                }else {
                    dot_rect(ctx, bi, current_x, y2)
                }
            }
        }
    }
    return [cvs.width, cvs.height]
}

function draw_qbits(test_json, cols){

    var cvs_q = document.getElementById("qbits");
    var ctx_q = cvs_q.getContext("2d");

    //calculate the canvas size
    var y_size = 1
    for (var i = 0; i < test_json.qbits.length; i++) {
        if (i != 0 && i % cols == 0) {
            y_size++
        }
    }

    //change the canvas size
    cvs_q.width = (15 + 5) * 2 * (test_json.qbits.length > cols ? cols+1 : test_json.qbits.length + 1)
    cvs_q.height = (15 + 5) * 2 * y_size

    var qx = 0
    var qy = 0
    var qs = "0"
    qbits_num_text(ctx_q, 0, 0, qs)
    for (var i = 0; i < test_json.qbits.length; i++) {
        if (i != 0 && i % cols == 0) {
            qx = 0
            qy++
            qs = i.toString()
            qbits_num_text(ctx_q, qx, qy, qs)
        }
        var q = test_json.qbits[i]
        var r = q[0]
        var deg = q[1]
        qbit_circle(ctx_q, qx, qy, r, deg)
        qx++
    }

    return [cvs_q.width, cvs_q.height]
}

