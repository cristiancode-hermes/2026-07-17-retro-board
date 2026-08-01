"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const typeorm_1 = require("typeorm");
const card_entity_1 = require("../../cards/entities/card.entity");
const column_entity_1 = require("../../columns/entities/column.entity");
let Board = class Board {
};
exports.Board = Board;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Board.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Board.prototype, "sprintName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Board.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Board.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Board.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => column_entity_1.ColumnEntity, (column) => column.board, { cascade: true }),
    __metadata("design:type", Array)
], Board.prototype, "columns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => card_entity_1.Card, (card) => card.board),
    __metadata("design:type", Array)
], Board.prototype, "cards", void 0);
exports.Board = Board = __decorate([
    (0, typeorm_1.Entity)('boards')
], Board);
//# sourceMappingURL=board.entity.js.map