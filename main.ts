input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    callibot2.write_motor_prozent(callibot2.eMotor.beide, 80)
    callibot2.wait_us(20)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    for (let index = 0; index < 4; index++) {
        callibot2.write_rgbled(0x00ff00)
        callibot2.write_motoren_prozent(60, 60)
        callibot2.encoder_wait_cm(20)
        callibot2.write_rgbled(0xa300ff)
        callibot2.write_motoren_prozent(60, -60)
        callibot2.encoder_wait_grad(90)
    }
    callibot2.write_motoren_prozent(-100, 100)
    callibot2.encoder_wait_grad(360)
    callibot2.write_rgbled(0x000000)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (go == 0) {
        go = 1
        basic.setLedColor(0xffff00)
    } else {
        go = 0
        basic.setLedColor(0xff0000)
        callibot2.write_motor_prozent(callibot2.eMotor.beide, 0)
    }
})
let go = 0
callibot2.reset_outputs()
go = 0
basic.showNumber(callibot2.read_power())
basic.showString(callibot2.read_typ())
basic.forever(function () {
    if (go == 1) {
        callibot2.comment("1 bis zur Linie geradeaus fahren")
        callibot2.write_motor_prozent(callibot2.eMotor.beide, 50)
        callibot2.wait_spursensor()
        go = 2
        basic.setLedColor(0x00ff00)
    } else if (go == 2) {
        callibot2.comment("2 Spur folgen")
        callibot2.read_inputs()
        if (!(callibot2.get_inputs(callibot2.eINPUTS.sp2l)) && !(callibot2.get_inputs(callibot2.eINPUTS.sp1r))) {
            callibot2.comment("beide schwarz")
            callibot2.write_motor_prozent(callibot2.eMotor.beide, 100)
        } else if (callibot2.get_inputs(callibot2.eINPUTS.sp2l) && !(callibot2.get_inputs(callibot2.eINPUTS.sp1r))) {
            callibot2.comment("nach rechts lenken")
            callibot2.write_motoren_prozent(50, -50)
        } else if (!(callibot2.get_inputs(callibot2.eINPUTS.sp2l)) && callibot2.get_inputs(callibot2.eINPUTS.sp1r)) {
            callibot2.comment("nach links lenken")
            callibot2.write_motoren_prozent(-50, 50)
        } else if (callibot2.get_inputs(callibot2.eINPUTS.sp2l) && callibot2.get_inputs(callibot2.eINPUTS.sp1r)) {
            callibot2.comment("beide hell: Spur verloren")
            callibot2.write_motoren_prozent(50, -50)
            callibot2.wait_spursensor()
        }
    }
})
