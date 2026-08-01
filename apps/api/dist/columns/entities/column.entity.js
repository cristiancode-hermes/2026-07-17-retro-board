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
exports.ColumnEntity = void 0;
const typeorm_1 = require("typeorm");
const board_entity_1 = require("../../boards/entities/board.entity");
const card_entity_1 = require("../../cards/entities/card.entity");
let ColumnEntity = class ColumnEntity {
};
exports.ColumnEntity = ColumnEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ColumnEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ColumnEntity.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnEntity.prototype, "boardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_entity_1.Board, (board) => board.columns, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'boardId' }),
    __metadata("design:type", board_entity_1.Board)
], ColumnEntity.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => card_entity_1.Card, (card) => card.column),
    __metadata("design:type", Array)
], ColumnEntity.prototype, "cards", void 0);
exports.ColumnEntity = ColumnEntity = __decorate([
    (0, typeorm_1.Entity)('columns')
], ColumnEntity);
//# sourceMappingURL=column.entity.js.map